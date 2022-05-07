import { createReducer } from '@reduxjs/toolkit';
import { ReduxAction } from '../../constants/types/reducer-action.type';
import { UiActions } from '../action-types/ui-action-types';
import { UiStore } from '../types/ui.store';

const iState: UiStore = {
  additionModalVisible: false,
  listDialogVisible: false
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
  })
});

export default uiReducer;
