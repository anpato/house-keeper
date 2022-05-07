import { createAction } from '@reduxjs/toolkit';
import { FormActions } from '../action-types/form-action.types';
import { AdditionFormActionParams } from '../types/addition-form.store';

export const SetAdditionForm = createAction<AdditionFormActionParams>(
  FormActions.SetAdditionForm
);

export const ClearAdditionForm = createAction(FormActions.ClearAdditionForm);

export const SetListForm = createAction<string>(FormActions.SetListForm);

export const ClearListForm = createAction(FormActions.ClearListForm);
