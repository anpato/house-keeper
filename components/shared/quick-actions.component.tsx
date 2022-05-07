import { Add, PlaylistAdd, Settings } from '@mui/icons-material';
import { SpeedDial, SpeedDialAction } from '@mui/material';
import { FC } from 'react';

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
  return (
    <SpeedDial
      ariaLabel="controls"
      icon={<Settings />}
      sx={{ position: 'absolute', bottom: 16, right: 16 }}
    >
      <SpeedDialAction
        onClick={toggleList}
        color="info"
        FabProps={{
          sx: {
            bgcolor: 'success.main'
          }
        }}
        tooltipTitle="Create a list"
        icon={<PlaylistAdd />}
      />
      {homeAdditionHidden ? null : (
        <SpeedDialAction
          color="info"
          onClick={toggleAddition}
          tooltipTitle="Add a home"
          FabProps={{
            sx: {
              bgcolor: 'success.main'
            }
          }}
          icon={<Add />}
        />
      )}
    </SpeedDial>
  );
};

export default QuickActions;
