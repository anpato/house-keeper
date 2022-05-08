import { Close, Save } from '@mui/icons-material';
import {
  AppBar,
  Dialog,
  DialogContent,
  Toolbar,
  Typography,
  IconButton,
  Button
} from '@mui/material';
import { FC, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import HomeService from '../../services/home.service';
import { useAppDispatch, useAppSelector } from '../../store';
import { ClearAdditionForm } from '../../store/actions/form.actions';
import { AddHome } from '../../store/actions/listings.actions';
import AdditionForm from './addition-form.component';
import SlideUp from './transitions/slide-up.component';

type IProps = {
  modalOpen: boolean;
  closeModal: () => void;
};

const AdditionModal: FC<IProps> = ({ modalOpen, closeModal }) => {
  const { user, additionForm } = useAppSelector((state) => ({
    user: state.session.id,
    additionForm: state.forms.additionForm
  }));
  const dispatch = useAppDispatch();
  const addHome = useMutation(
    'POST/Add-Home',
    async () => await HomeService.createHome(additionForm, user),
    {
      onSuccess: (data) => {
        dispatch(ClearAdditionForm());
        dispatch(AddHome(data));
        closeModal();
        toast.success(`Added ${data.address}`);
      }
    }
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await addHome.mutateAsync();
  };

  const handleClose = () => {
    dispatch(ClearAdditionForm());
    closeModal();
  };

  return (
    <Dialog
      fullScreen
      fullWidth
      open={modalOpen}
      onClose={handleClose}
      TransitionComponent={SlideUp}
    >
      <form onSubmit={handleSubmit}>
        <AppBar sx={{ position: 'relative' }} color="secondary">
          <Toolbar>
            <IconButton edge="end" onClick={handleClose} color="error">
              <Close />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Add a home
            </Typography>

            <Button
              variant="contained"
              color="success"
              type="submit"
              endIcon={<Save />}
            >
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <AdditionForm />
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AdditionModal;
