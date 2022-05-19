import {
  Card,
  CardHeader,
  CircularProgress,
  Container,
  Divider,
  Typography
} from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQueries, useQuery } from 'react-query';
import { LoadHomeList } from '../../constants/models/home-list.model';
import PaddedLayout from '../../layouts/padded.layout';
import homeService from '../../services/home.service';
import listService from '../../services/list.service';
import { useAppDispatch, useAppSelector } from '../../store';
import { LoadListDetails } from '../../store/actions/view-list.actions';

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
      queryKey: ['Get/Homes', router.query.list_id],
      enabled: !!router.query.list_id,
      queryFn: async () =>
        await homeService.getPaginatedHomes(
          router.query.list_id as string,
          listDetails.page,
          listDetails.limit
        ),
      onSuccess: (
        data: Pick<LoadHomeList, 'limit' | 'homes' | 'pages' | 'page'>
      ) => {
        dispatch(LoadListDetails(data));
      }
    }
  ]);

  if (listReq.isLoading || homeReq.isLoading) {
    return <CircularProgress />;
  }

  return (
    <PaddedLayout>
      <Head>
        <title>Your Lists</title>
      </Head>
      <Container component="main" fixed>
        <Typography variant="h4">{list?.name}</Typography>

        <Divider />
      </Container>
    </PaddedLayout>
  );
};

export default ViewList;
