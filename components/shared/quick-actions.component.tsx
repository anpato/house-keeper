import {
  Add,
  ArrowBack,
  DarkMode,
  Home,
  LightMode,
  PlaylistAdd,
  Settings
} from '@mui/icons-material';
import { FabProps, SpeedDial, SpeedDialAction } from '@mui/material';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { Theme } from '../../constants/enums/theme.enum';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  SetTheme,
  ToggleAdditionModal,
  ToggleListModal
} from '../../store/actions/ui.actions';

type IProps = {
  homeAdditionHidden: boolean;
};

const QuickActions: FC<IProps> = ({ homeAdditionHidden }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);
  const router = useRouter();
  const toggleList = () => dispatch(ToggleListModal(true));
  const toggleAddition = () => dispatch(ToggleAdditionModal(true));
  const toggleTheme = () => {
    if (theme === Theme.Light) {
      localStorage.setItem('user-theme', Theme.Dark);
      dispatch(SetTheme(Theme.Dark));
    } else {
      localStorage.setItem('user-theme', Theme.Light);
      dispatch(SetTheme(Theme.Light));
    }
  };

  const fabProps: FabProps = {
    sx: {
      bgcolor: 'success.main',
      color: '#333'
    }
  };

  return (
    <SpeedDial
      ariaLabel="controls"
      icon={<Settings />}
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
    >
      <SpeedDialAction
        onClick={toggleTheme}
        FabProps={fabProps}
        tooltipTitle="Change the theme"
        icon={theme && theme === Theme.Dark ? <DarkMode /> : <LightMode />}
      />
      <SpeedDialAction
        onClick={toggleList}
        color="info"
        FabProps={fabProps}
        tooltipTitle="Create a list"
        icon={<PlaylistAdd />}
      />
      {homeAdditionHidden ? null : (
        <SpeedDialAction
          color="info"
          onClick={toggleAddition}
          tooltipTitle="Add a home"
          FabProps={fabProps}
          icon={<Add />}
        />
      )}
      {router.pathname !== '/dashboard' ? (
        <SpeedDialAction
          color="info"
          onClick={() => router.push('/dashboard')}
          tooltipTitle="Back to your dashboard"
          FabProps={fabProps}
          icon={<Home />}
        />
      ) : null}
    </SpeedDial>
  );
};

export default QuickActions;
