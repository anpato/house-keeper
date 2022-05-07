import { Grid } from '@mui/material';
import { useAppSelector } from '../../../store';
import QuickView from '../../shared/cards/quick-view.component';
import QuickViewSection from '../../shared/sections/quick-view-section.component';

const RecentList = () => {
  const recents = useAppSelector((state) => state.listings.recentHomes);
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
          />
        </Grid>
      ))}
    </QuickViewSection>
  );
};

export default RecentList;
