import { createAction } from '@reduxjs/toolkit';
import { LoadHomeList } from '../../constants/models/home-list.model';
import { ViewListActions } from '../action-types/view-list-action.types';

export const LoadListDetails = createAction<LoadHomeList>(
  ViewListActions.LoadList
);

export const ChangePage = createAction<number>(ViewListActions.ChangePage);

export const ChangeLimit = createAction<number>(ViewListActions.ChangeLimit);
