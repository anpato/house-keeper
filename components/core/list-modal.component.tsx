import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField
} from '@mui/material';
import { ChangeEvent, FC, FormEvent, FormEventHandler } from 'react';
import { useMutation } from 'react-query';
import listService from '../../services/list.service';
import { useAppDispatch, useAppSelector } from '../../store';
import { ClearListForm, SetListForm } from '../../store/actions/form.actions';

type IProps = {
  listOpen: boolean;
  closeModal: () => void;
};

const ListModal: FC<IProps> = ({ listOpen, closeModal }) => {
  const { user, name } = useAppSelector((state) => ({
    name: state.forms.listForm.name,
    user: state.session.id
  }));
  const dispatch = useAppDispatch();
  const cancelList = () => {
    dispatch(ClearListForm());
    closeModal();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(SetListForm(e.target.value));
  };

  const createList = useMutation(
    'CreateList',
    async () => await listService.createList(user, name),
    {
      onSuccess: () => {
        cancelList();
      }
    }
  );

  const handleCreateList = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    await createList.mutateAsync();
  };

  return (
    <Dialog fullWidth open={listOpen} onClose={closeModal}>
      <DialogTitle>Create a list</DialogTitle>
      <Divider />
      <form onSubmit={handleCreateList}>
        <DialogContent>
          <TextField
            onChange={handleChange}
            required
            fullWidth
            value={name}
            label="Name"
            type="text"
            name="name"
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={cancelList}>
            Cancel
          </Button>
          <Button type="submit" variant="outlined" color="info">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ListModal;
