import { createAction } from '@reduxjs/toolkit';
import { UiActions } from '../action-types/ui-action-types';

export const ToggleAdditionModal = createAction<boolean>(
  UiActions.ToggleAdditionModal
);

export const ToggleListModal = createAction<boolean>(UiActions.ToggleListModal);
