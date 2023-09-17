import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import userFetchReducer from '../features/users/userFetchSlice';
export const store = configureStore({
  reducer: {
    userReducer,
    userFetchReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;