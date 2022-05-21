import { CircularProgress, Grid } from '@mui/material';
import { NextRouter } from 'next/router';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import homeService from '../../../services/home.service';
import { useAppDispatch, useAppSelector } from '../../../store';
import { DeleteHome } from '../../../store/actions/listings.actions';
import HomeCard from '../../shared/cards/home-card.component';
import QuickViewSection from '../../shared/sections/quick-view-section.component';

type IProps = {
  router: NextRouter;
};

const RecentList: FC<IProps> = ({ router }) => {
  const recents = useAppSelector((state) => state.listings.recentHomes);
  const dispatch = useAppDispatch();
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
    const target = recents.find((h) => h.id === homeId);
    await toast.promise(deleteHome.mutateAsync(homeId), {
      loading: <CircularProgress />,
      success: `Deleted ${target?.address}`,
      error: `Error deleting ${target?.address}`
    });
  };

  return (
    <QuickViewSection title="Recently saved homes">
      {recents.map((h) => (
        <Grid item key={h.id} md={6} flexGrow={1}>
          <HomeCard
            title={h.address}
            subtitle={h.createdAt}
            url={h.link}
            id={h.id}
            handleDelete={() => handleDelete(h.id)}
          />
        </Grid>
      ))}
    </QuickViewSection>
  );
};

export default RecentList;
