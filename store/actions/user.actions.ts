import { createAction } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import { User } from '../../constants/models/user.model';
import { ReduxAction } from '../../constants/types/reducer-action.type';
import { UserActions } from '../action-types/user.action-types';
import { UserStore } from '../types/user.store';

export const SetUser = createAction<UserStore>(UserActions.SetUser);

export const ClearUser = createAction(UserActions.ClearUser);
