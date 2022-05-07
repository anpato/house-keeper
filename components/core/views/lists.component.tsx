import { Grid } from '@mui/material';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import listService from '../../../services/list.service';
import { useAppSelector } from '../../../store';
import { DeleteList } from '../../../store/actions/listings.actions';
import QuickView from '../../shared/cards/quick-view.component';
import QuickViewSection from '../../shared/sections/quick-view-section.component';

const Lists = () => {
  const lists = useAppSelector((state) => state.listings.lists);
  const dispatch = useDispatch();
  const deleteList = useMutation(
    'DELETE/list',
    async (listId: string) => await listService.deleteList(listId),
    {
      onSuccess: (data) => {
        dispatch(DeleteList(data.listId));
      }
    }
  );

  const handleDelete = async (listId: string) => {
    await deleteList.mutateAsync(listId);
  };

  return (
    <QuickViewSection
      title="Your lists"
      cta="View All"
      disableCta={lists.length < 4}
    >
      {lists.map((l) => (
        <Grid key={l.id} xs={6} item>
          <QuickView
            title={l.name}
            secondaryTitle={`(${l?._count?.homes || 0} Homes)`}
            subtitle={l.createdAt}
            subtitleLabel="Created On"
            cta="View List"
            ctaLink=""
            disableCta={!l._count.homes}
            displayMenu
            onDelete={handleDelete}
            value={l.id}
          />
        </Grid>
      ))}
    </QuickViewSection>
  );
};

export default Lists;
