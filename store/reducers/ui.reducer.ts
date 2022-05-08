import { createReducer } from '@reduxjs/toolkit';
import { Theme } from '../../constants/enums/theme.enum';
import { ReduxAction } from '../../constants/types/reducer-action.type';
import { UiActions } from '../action-types/ui-action-types';
import { UiStore } from '../types/ui.store';

const iState: UiStore = {
  additionModalVisible: false,
  listDialogVisible: false,
  theme:
    (typeof window !== 'undefined' &&
      (localStorage.getItem('user-theme') as Theme)) ||
    Theme.Light
};

const uiReducer = createReducer(iState, {
  [UiActions.ToggleAdditionModal]: (
    state,
    { payload }: ReduxAction<boolean>
  ): UiStore => ({
    ...state,
    additionModalVisible: payload
  }),
  [UiActions.ToggleListModal]: (
    state,
    { payload }: ReduxAction<boolean>
  ): UiStore => ({
    ...state,
    listDialogVisible: payload
  }),
  [UiActions.SetTheme]: (state, { payload }: ReduxAction<Theme>) => ({
    ...state,
    theme: payload
  })
});

export default uiReducer;
