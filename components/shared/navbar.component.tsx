import { Add, Logout } from '@mui/icons-material';
import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material';
import { signOut } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store';
import {
  ToggleAdditionModal,
  ToggleListModal
} from '../../store/actions/ui.actions';
import { ClearUser } from '../../store/actions/user.actions';

const Navbar = () => {
  const { name, numOfLists } = useAppSelector((state) => ({
    name: state.session.name,
    numOfLists: state.listings.lists.length
  }));
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(ClearUser());
    signOut({ callbackUrl: '/' });
  };

  return (
    <AppBar position="static" color="secondary">
      <Toolbar style={{ width: '100%' }}>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>Welcome {name}</Typography>

          <Stack alignItems="center" direction="row" gap={4}>
            <Button
              onClick={() =>
                numOfLists
                  ? dispatch(ToggleAdditionModal(true))
                  : dispatch(ToggleListModal(true))
              }
              color="info"
            >
              <Add />
            </Button>

            <Button
              variant="contained"
              onClick={handleSignout}
              endIcon={<Logout />}
            >
              Sign Out
            </Button>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
