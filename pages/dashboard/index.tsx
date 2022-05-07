import { Home, HomeList } from '@prisma/client';
import { useMutation, useQueries, useQuery } from 'react-query';
import ListModal from '../../components/core/list-modal.component';
import Lists from '../../components/core/views/lists.component';
import RecentList from '../../components/core/views/recent-list.component';
import AdditionModal from '../../components/shared/addition-modal.component';
import QuickActions from '../../components/shared/quick-actions.component';
import homeService from '../../services/home.service';
import ListService from '../../services/list.service';
import { useAppDispatch, useAppSelector } from '../../store';
import { LoadLists, LoadRecents } from '../../store/actions/listings.actions';
import {
  ToggleAdditionModal,
  ToggleListModal
} from '../../store/actions/ui.actions';

const Dashboard = () => {
  const {
    listDialogVisible,
    additionModalVisible,
    user,
    lists: currentLists
  } = useAppSelector((state) => ({
    ...state.ui,
    user: state.session.id,
    lists: state.listings.lists
  }));

  const dispatch = useAppDispatch();

  const [lists, homes] = useQueries([
    {
      queryKey: 'GET/Lists',
      enabled: !!user,
      queryFn: async () => await ListService.getLists(user),
      onSuccess: (data: HomeList[]) => {
        dispatch(LoadLists(data));
      }
    },
    {
      queryKey: 'GET/Homes-recent',
      enabled: !!user,
      queryFn: async () => await homeService.getRecentHomes(user),
      onSuccess: (data: Home[]) => dispatch(LoadRecents(data))
    }
  ]);

  const closeListModal = () => dispatch(ToggleListModal(false));
  const closeAdditionModal = () => dispatch(ToggleAdditionModal(false));
  const openListDialog = () => dispatch(ToggleListModal(true));
  const openAddition = () => dispatch(ToggleAdditionModal(true));

  return (
    <div style={{ padding: '1em 0' }}>
      <AdditionModal
        closeModal={closeAdditionModal}
        modalOpen={additionModalVisible}
      />
      <ListModal closeModal={closeListModal} listOpen={listDialogVisible} />
      <QuickActions
        homeAdditionHidden={!currentLists?.length}
        toggleAddition={openAddition}
        toggleList={openListDialog}
      />
      <Lists />
      <RecentList />
    </div>
  );
};

export default Dashboard;
