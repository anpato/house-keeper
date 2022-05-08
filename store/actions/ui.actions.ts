import { createAction } from '@reduxjs/toolkit';
import { Theme } from '../../constants/enums/theme.enum';
import { UiActions } from '../action-types/ui-action-types';

export const ToggleAdditionModal = createAction<boolean>(
  UiActions.ToggleAdditionModal
);

export const ToggleListModal = createAction<boolean>(UiActions.ToggleListModal);

export const SetTheme = createAction<Theme>(UiActions.SetTheme);
