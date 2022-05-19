import { useSession } from 'next-auth/react';
import { FC, useEffect } from 'react';
import AuthGuard from '../guards/auth-guard.component';
import { useRouter } from 'next/router';
import { ThemeProvider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store';
import { Theme } from '../constants/enums/theme.enum';
import { darkTheme, lightTheme } from '../constants/themes';
import toast, { Toaster } from 'react-hot-toast';
import QuickActions from '../components/shared/quick-actions.component';
import AdditionModal from '../components/shared/addition-modal.component';
import ListModal from '../components/core/list-modal.component';
import {
  ToggleAdditionModal,
  ToggleListModal
} from '../store/actions/ui.actions';
type IProps = {
  children: any;
};

const ThemeWrapper: FC<IProps> = ({ children }) => {
  const theme = useAppSelector((state) => state.ui.theme);
  return (
    <ThemeProvider theme={theme === Theme.Light ? lightTheme : darkTheme}>
      {children}
    </ThemeProvider>
  );
};

const RenderPage: FC<IProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  const {
    listDialogVisible,
    additionModalVisible,
    user,
    lists: currentLists
  } = useAppSelector((state) => ({
    ...state.ui,
    user: state.session.name,
    lists: state.listings.lists,
    homeCount: state.listings.recentHomes.length
  }));
  const dispatch = useAppDispatch();

  const closeListModal = () => dispatch(ToggleListModal(false));
  const closeAdditionModal = () => dispatch(ToggleAdditionModal(true));

  useEffect(() => {
    switch (status) {
      case 'authenticated':
        toast.success(`Welcome back ${user}`);
        break;
      case 'unauthenticated':
        router.push('/');
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  switch (status) {
    case 'authenticated':
      return (
        <ThemeWrapper>
          <AuthGuard>
            <Toaster position="top-right" />
            {children}
            <QuickActions homeAdditionHidden={!currentLists?.length ?? true} />
            <AdditionModal
              closeModal={closeAdditionModal}
              modalOpen={additionModalVisible}
            />
            <ListModal
              closeModal={closeListModal}
              listOpen={listDialogVisible}
            />
          </AuthGuard>
        </ThemeWrapper>
      );

    default:
      return children;
  }
};

export default RenderPage;
