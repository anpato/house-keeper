import { AddLocation, Link } from '@mui/icons-material';
import {
  Select,
  MenuItem,
  InputLabel,
  Stack,
  Box,
  InputAdornment,
  TextField,
  Autocomplete
} from '@mui/material';
import { WorkLevel } from '@prisma/client';
import { ChangeEvent } from 'react';
import { useQuery } from 'react-query';
import listService from '../../services/list.service';
import { useAppDispatch, useAppSelector } from '../../store';
import { SetAdditionForm } from '../../store/actions/form.actions';
import { AdditionForm } from '../../store/types/addition-form.store';
import FormItem from './forms/form-item.component';

const checkboxMap = [
  {
    name: 'None',
    value: WorkLevel.None
  },
  {
    name: 'Minor',
    value: WorkLevel.Minor
  },
  {
    name: 'Medium',
    value: WorkLevel.Medium
  },
  {
    name: 'Major',
    value: WorkLevel.Major
  }
];

const ranking = [...new Array(6)].map((_, i) => (
  <MenuItem key={i} value={i}>
    {i}
  </MenuItem>
));

const AdditionForm = () => {
  const { link, price, address, extraInfo, workLevel, rating, user, listId } =
    useAppSelector((state) => ({
      ...state.forms.additionForm,
      user: state.session.id
    }));
  const { data = [], isLoading } = useQuery(
    'GET/List-names',
    async () => await listService.getListNames(user)
  );

  const dispatch = useAppDispatch();

  const handleChange = ({
    target
  }:
    | ChangeEvent<HTMLFormElement>
    | { target: { name: string; value: any } }) => {
    dispatch(
      SetAdditionForm({
        key: target.name as keyof AdditionForm,
        value: target.value
      })
    );
  };

  const options = checkboxMap.map((option) => (
    <MenuItem key={option.name} value={option.value}>
      {option.name}
    </MenuItem>
  ));

  return (
    <Stack direction="column" gap={2} alignItems="center">
      <FormItem
        fullWidth
        label="Link to listing"
        required
        placeholder="https://zillow.com/"
        type="url"
        name="link"
        onChange={handleChange}
        value={link}
        adornment={
          <InputAdornment position="start">
            <Link />
          </InputAdornment>
        }
      />
      <FormItem
        required
        placeholder="Price"
        // labelLeft="$"
        adornment={<InputAdornment position="start">$</InputAdornment>}
        name="price"
        value={price}
        onChange={handleChange}
        type="text"
        fullWidth
        label="Price"
        // bordered
      />
      <Stack direction="row" alignItems="center" sx={{ width: '100%' }} gap={2}>
        <FormItem
          required
          name="address"
          value={address}
          onChange={handleChange}
          adornment={
            <InputAdornment position="start">
              <AddLocation />
            </InputAdornment>
          }
          placeholder="123 wallaby way, sydney"
          type="text"
          fullWidth
          label="Address"
        />
        <Autocomplete
          loading={isLoading}
          fullWidth
          sx={{ flexGrow: 1 }}
          disablePortal
          onChange={(_, v, r) =>
            r === 'clear'
              ? handleChange({
                  target: {
                    name: 'listId',
                    value: ''
                  }
                })
              : handleChange({
                  target: {
                    name: 'listId',
                    value: v?.id
                  }
                })
          }
          // value={listId}
          isOptionEqualToValue={(v) => v.id === listId}
          placeholder="Select a list"
          options={data && data.map((l) => ({ label: l.name, id: l.id }))}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a list"
              // value={listId}
              required
            />
          )}
        />
      </Stack>

      <FormItem
        multiline
        label="Extra Info"
        name="extraInfo"
        rows={4}
        value={extraInfo}
        fullWidth
        placeholder="Descriptive information about the listing"
        onChange={handleChange}
      />
      <Stack direction="row" gap={2} alignItems="center" sx={{ width: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <InputLabel id="work-level">Work needed on home</InputLabel>
          <Select
            fullWidth
            labelId="work-level"
            value={workLevel}
            onChange={(e) =>
              handleChange({
                ...e,
                target: { ...e.target, name: 'workLevel' }
              })
            }
          >
            {options}
          </Select>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <InputLabel id="rating">Viewing priority</InputLabel>
          <Select
            fullWidth
            onChange={(e) =>
              handleChange({
                ...e,
                target: { ...e.target, name: 'rating' }
              })
            }
            labelId="rating"
            value={rating}
          >
            {ranking}
          </Select>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AdditionForm;
