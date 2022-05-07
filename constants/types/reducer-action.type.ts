import { Action } from 'redux';

export interface ReduxAction<T> extends Action {
  type: string;
  payload: T;
}
