import { Home, HomeList } from '@prisma/client';
import { createAction } from '@reduxjs/toolkit';
import { ListingActionTypes } from '../action-types/listings-action.types';

export const LoadLists = createAction<HomeList[]>(ListingActionTypes.LoadLists);

export const LoadHomes = createAction<Home[]>(ListingActionTypes.LoadHomes);

export const LoadShared = createAction<HomeList[]>(
  ListingActionTypes.LoadSharedLists
);

export const LoadRecents = createAction<Home[]>(ListingActionTypes.LoadRecents);
