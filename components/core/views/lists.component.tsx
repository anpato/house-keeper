import { Grid } from '@mui/material';
import { useAppSelector } from '../../../store';
import QuickView from '../../shared/cards/quick-view.component';
import QuickViewSection from '../../shared/sections/quick-view-section.component';

const Lists = () => {
  const lists = useAppSelector((state) => state.listings.lists);
  return (
    <QuickViewSection
      title="Your lists"
      cta="View All"
      disableCta={lists.length < 4}
    >
      {lists.map((l) => (
        <Grid key={l.id} sx={{ flexGrow: 1 }}>
          <QuickView
            title={l.name}
            secondaryTitle={`(${l._count.homes} Homes)`}
            subtitle={l.createdAt}
            subtitleLabel="Created On"
            cta="View List"
            ctaLink=""
            disableCta={!l._count.homes}
          />
        </Grid>
      ))}
    </QuickViewSection>
  );
};

export default Lists;
