import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQueries, useQuery } from 'react-query';
import { LoadHomeList } from '../../constants/models/home-list.model';
import homeService from '../../services/home.service';
import listService from '../../services/list.service';
import { useAppDispatch, useAppSelector } from '../../store';
import { LoadListDetails } from '../../store/actions/view-list.actions';

const ViewList = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const listDetails = useAppSelector((state) => state.listDetails);
  const [list] = useQueries([
    {
      queryKey: ['Get/List', router.query.list_id],
      queryFn: async () =>
        await listService.getList(router.query.list_id as string),
      onSuccess: (data: any) => {
        dispatch(LoadListDetails(data));
      }
    },
    {
      queryKey: ['Get/Homes'],
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
  return (
    <main>
      <Head>
        <title>Your Lists</title>
      </Head>
      <div>Lists</div>
    </main>
  );
};

export default ViewList;
