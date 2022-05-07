import { createReducer } from '@reduxjs/toolkit';
import { ReduxAction } from '../../constants/types/reducer-action.type';
import { UserActions } from '../action-types/user.action-types';
import { UserStore } from '../types/user.store';

const iState: UserStore = {
  name: '',
  id: ''
};

const UserReducer = createReducer<UserStore>(iState, {
  [UserActions.SetUser]: (_, { payload }: ReduxAction<UserStore>) => payload,
  [UserActions.ClearUser]: () => iState
});

export default UserReducer;
