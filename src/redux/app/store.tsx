import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import userFetchReducer from '../features/users/userFetchSlice';
import aracKoduReducer from '../features/parametreler/aracKoduSlice';
import makamKoduReducer from '../features/parametreler/makamKoduSlice';
import parametreReducer from '../features/parametreler/parametreSlice';
import rocketsReducer from '../features/rockets/rocketsSlice';

export const store = configureStore({
  reducer: {
    userReducer,
    userFetchReducer,
    aracKoduReducer,
    makamKoduReducer,
    parametreReducer,
    rocketsReducer
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;