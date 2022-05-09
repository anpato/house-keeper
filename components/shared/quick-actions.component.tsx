import {
  Add,
  DarkMode,
  LightMode,
  PlaylistAdd,
  Settings
} from '@mui/icons-material';
import { FabProps, SpeedDial, SpeedDialAction } from '@mui/material';
import { FC } from 'react';
import { Theme } from '../../constants/enums/theme.enum';
import { useAppDispatch, useAppSelector } from '../../store';
import { SetTheme } from '../../store/actions/ui.actions';

type IProps = {
  toggleList: () => void;
  toggleAddition: () => void;
  homeAdditionHidden: boolean;
};

const QuickActions: FC<IProps> = ({
  toggleList,
  toggleAddition,
  homeAdditionHidden
}) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.ui.theme);

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
    </SpeedDial>
  );
};

export default QuickActions;
