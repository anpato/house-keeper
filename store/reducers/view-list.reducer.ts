import { createReducer } from '@reduxjs/toolkit';
import { ListStore } from '../types/list-detail.store';

const iState: ListStore = {
  list: null,
  homes: [],
  page: 1,
  limit: 10
};

const ViewListReducer = createReducer(iState, {});

export default ViewListReducer;
