import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';

type IProps = {
  isLoading: boolean;
};

const Loading: FC<IProps> = ({ isLoading }) => {
  return (
    <Backdrop
      sx={{ color: 'Background', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
      style={{ height: '100vh' }}
    >
      <CircularProgress />
    </Backdrop>
  );
};

export default Loading;
