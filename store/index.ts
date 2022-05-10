import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import FormReducer from './reducers/form.reducer';
import ListingReducer from './reducers/listing.reducer';
import uiReducer from './reducers/ui.reducer';
import UserReducer from './reducers/user.reducer';
import ViewListReducer from './reducers/view-list.reducer';

const store = configureStore({
  reducer: {
    session: UserReducer,
    ui: uiReducer,
    forms: FormReducer,
    listings: ListingReducer,
    listDetails: ViewListReducer
  },
  devTools: true
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
