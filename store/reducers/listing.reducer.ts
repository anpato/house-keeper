import { Home, HomeList } from '@prisma/client';
import { createReducer } from '@reduxjs/toolkit';
import { ReduxAction } from '../../constants/types/reducer-action.type';
import { ListingActionTypes } from '../action-types/listings-action.types';
import { HomeListWithCount, ListingStore } from '../types/listings.store';

const iState: ListingStore = {
  recentHomes: [],
  lists: [],
  homes: [],
  sharedLists: []
};

const ListingReducer = createReducer(iState, {
  [ListingActionTypes.LoadLists]: (
    state,
    { payload }: ReduxAction<HomeListWithCount[]>
  ) => ({
    ...state,
    lists: payload
  }),
  [ListingActionTypes.LoadHomes]: (
    state,
    { payload }: ReduxAction<Home[]>
  ) => ({
    ...state,
    homes: payload
  }),
  [ListingActionTypes.LoadRecents]: (
    state,
    { payload }: ReduxAction<Home[]>
  ) => ({
    ...state,
    recentHomes: payload
  }),
  [ListingActionTypes.LoadSharedLists]: (
    state,
    { payload }: ReduxAction<HomeList[]>
  ) => ({
    ...state,
    sharedLists: payload
  }),
  [ListingActionTypes.AddHome]: (state, { payload }: ReduxAction<Home>) => ({
    ...state,
    recentHomes: [payload, ...state.homes]
  }),
  [ListingActionTypes.AddList]: (
    state,
    { payload }: ReduxAction<HomeListWithCount>
  ) => ({
    ...state,
    lists: [payload, ...state.lists]
  }),
  [ListingActionTypes.DeleteList]: (
    state,
    { payload }: ReduxAction<string>
  ) => ({
    ...state,
    lists: state.lists.filter((list) => list.id !== payload),
    recentHomes: state.recentHomes.filter((home) => home.listId === payload)
  })
});

export default ListingReducer;
