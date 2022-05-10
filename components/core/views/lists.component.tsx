import { CircularProgress, Grid } from '@mui/material';
import { NextRouter } from 'next/router';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import listService from '../../../services/list.service';
import { useAppSelector } from '../../../store';
import { DeleteList } from '../../../store/actions/listings.actions';
import QuickView from '../../shared/cards/quick-view.component';
import QuickViewSection from '../../shared/sections/quick-view-section.component';

type IProps = {
  router: NextRouter;
};

const Lists: FC<IProps> = ({ router }) => {
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
    const target = lists.find((l) => l.id === listId);
    await toast.promise(deleteList.mutateAsync(listId), {
      loading: <CircularProgress />,
      success: `Deleted ${target?.name}`,
      error: `Error deleting ${target?.name}`
    });
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
            action={() => router.push(`/lists/${l.id}`)}
            disableCta={!l._count.homes}
            onDelete={handleDelete}
            value={l.id}
          />
        </Grid>
      ))}
    </QuickViewSection>
  );
};

export default Lists;
