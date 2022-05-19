import { createReducer } from '@reduxjs/toolkit';
import { LoadHomeList } from '../../constants/models/home-list.model';
import { ReduxAction } from '../../constants/types/reducer-action.type';
import { ViewListActions } from '../action-types/view-list-action.types';
import { ListStore } from '../types/list-detail.store';
const iState: ListStore = {
  list: null,
  homes: [],
  page: 1,
  limit: 5,
  pages: 0
};

const ViewListReducer = createReducer(iState, {
  [ViewListActions.LoadList]: (
    state,
    { payload }: ReduxAction<LoadHomeList>
  ) => ({
    ...state,
    ...payload
  }),
  [ViewListActions.ChangePage]: (state, { payload }: ReduxAction<number>) => ({
    ...state,
    page: payload
  })
});

export default ViewListReducer;
