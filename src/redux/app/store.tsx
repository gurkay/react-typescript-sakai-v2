import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import userFetchReducer from '../features/users/userFetchSlice';
import aracKoduReducer from '../features/combobox/aracKoduSlice';
import makamKoduReducer from '../features/combobox/makamKoduSlice';
import parametreReducer from '../features/combobox/parametreSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    userFetchReducer,
    aracKoduReducer,
    makamKoduReducer,
    parametreReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;