import { WorkLevel } from '@prisma/client';
import { createReducer } from '@reduxjs/toolkit';
import { ReduxAction } from '../../constants/types/reducer-action.type';
import { FormActions } from '../action-types/form-action.types';
import {
  AdditionFormActionParams,
  FormStore
} from '../types/addition-form.store';

const iState: FormStore = {
  additionForm: {
    link: '',
    price: '',
    address: '',
    extraInfo: '',
    workLevel: WorkLevel.None,
    rating: 0,
    listId: ''
  },
  listForm: {
    name: ''
  }
};

const FormReducer = createReducer(iState, {
  [FormActions.SetAdditionForm]: (
    state,
    { payload }: ReduxAction<AdditionFormActionParams>
  ) => ({
    ...state,
    additionForm: {
      ...state.additionForm,
      [payload.key]: payload.value
    }
  }),
  [FormActions.ClearAdditionForm]: (state) => ({
    ...state,
    additionForm: iState.additionForm
  }),
  [FormActions.SetListForm]: (state, { payload }: ReduxAction<string>) => ({
    ...state,
    listForm: {
      name: payload
    }
  }),
  [FormActions.ClearListForm]: (state) => ({
    ...state,
    listForm: iState.listForm
  })
});

export default FormReducer;
