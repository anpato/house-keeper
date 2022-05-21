import {
  CircularProgress,
  Container,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation, useQueries } from 'react-query';
import HomeCard from '../../components/shared/cards/home-card.component';
import CardLoader from '../../components/shared/loaders/card-loader.component';
import { LoadHomeList } from '../../constants/models/home-list.model';
import PaddedLayout from '../../layouts/padded.layout';
import homeService from '../../services/home.service';
import listService from '../../services/list.service';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  ChangePage,
  LoadListDetails
} from '../../store/actions/view-list.actions';
import { toast } from 'react-hot-toast';
import { DeleteHome } from '../../store/actions/listings.actions';

const ViewList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { list, homes, ...listDetails } = useAppSelector(
    (state) => state.listDetails
  );

  const [listReq, homeReq] = useQueries([
    {
      queryKey: ['Get/List', router.query.list_id],
      enabled: !!router.query.list_id,
      queryFn: async () =>
        await listService.getList(router.query.list_id as string),
      onSuccess: (data: any) => {
        dispatch(LoadListDetails(data));
      }
    },
    {
      queryKey: [
        'Get/Homes',
        router.query.list_id,
        listDetails.page,
        router.query.page
      ],
      enabled: !!router.query.list_id,
      queryFn: async () =>
        await homeService.getPaginatedHomes(
          router.query.list_id as string,
          Number(router.query.page) || listDetails.page,
          listDetails.limit
        ),
      onSuccess: (
        data: Pick<LoadHomeList, 'limit' | 'homes' | 'pages' | 'page'>
      ) => {
        dispatch(LoadListDetails(data));
      }
    }
  ]);

  const deleteHome = useMutation(
    'DELETE/Home',
    async (homeId: string) => homeService.deleteHome(homeId),
    {
      onSuccess: (data) => {
        dispatch(DeleteHome(data.id));
      }
    }
  );

  const handleDelete = async (homeId: string) => {
    const target = homes.find((h) => h.id === homeId);
    await toast.promise(deleteHome.mutateAsync(homeId), {
      loading: <CircularProgress />,
      success: `Deleted ${target?.address}`,
      error: `Error deleting ${target?.address}`
    });
  };

  const changePage = (page: number) => {
    router.pathname = window.location.pathname + `?page=${page}`;
    router.push(router.pathname);
    dispatch(ChangePage(page));
  };

  if (listReq.isLoading) {
    return <CircularProgress />;
  }

  const cardRenderer = () => {
    if (homeReq.isFetching || homeReq.isLoading) {
      return [...new Array(4)].map((_, i) => (
        <Grid key={i} item md={6} flexGrow={1}>
          <CardLoader />
        </Grid>
      ));
    }

    return homes.map((home) => (
      <Grid item key={home.id} md={6} flexGrow={1}>
        <HomeCard
          id={home.id}
          title={home.address}
          subtitle={home.createdAt}
          url={home.link}
          handleDelete={() => handleDelete(home.id)}
        />
      </Grid>
    ));
  };

  return (
    <PaddedLayout>
      <Head>
        <title>Your Lists | {list?.name}</title>
      </Head>
      <Container component="main" fixed>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4">{list?.name}</Typography>
          <Pagination
            page={listDetails.page}
            count={listDetails.pages}
            onChange={(_, page) => changePage(page)}
          />
        </Stack>
        <Divider />
        <Grid container paddingTop={2} spacing={2}>
          {cardRenderer()}
        </Grid>
      </Container>
    </PaddedLayout>
  );
};

export default ViewList;
