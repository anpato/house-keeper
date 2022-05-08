import { CircularProgress, Grid } from '@mui/material';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import homeService from '../../../services/home.service';
import { useAppDispatch, useAppSelector } from '../../../store';
import { DeleteHome } from '../../../store/actions/listings.actions';
import QuickView from '../../shared/cards/quick-view.component';
import QuickViewSection from '../../shared/sections/quick-view-section.component';

const RecentList = () => {
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
    <QuickViewSection
      title="Recently saved homes"
      cta="View all recent homes"
      disableCta={recents.length < 4}
    >
      {recents.map((h) => (
        <Grid key={h.id} sx={{ flexGrow: 1 }}>
          <QuickView
            displayLink
            title={h.address}
            subtitle={h.createdAt}
            subtitleLabel="Added on"
            cta="View Home"
            ctaLink=""
            url={h.link}
            displayMenu
            value={h.id}
            onDelete={handleDelete}
          />
        </Grid>
      ))}
    </QuickViewSection>
  );
};

export default RecentList;
