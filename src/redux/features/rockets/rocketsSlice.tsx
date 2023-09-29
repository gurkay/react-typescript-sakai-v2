import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

const ROCKET_URL = 'https://api.spacexdata.com/v3/rockets';

interface InitialState {
    rockets: Array<any>,
    status: string,
    error: string | undefined
}

export const initialState: InitialState = {
    rockets: [],
    status: 'idle',
    error: undefined,    
}

export const getRockets = createAsyncThunk(
    'rockets/fetchRockets',
    async () => {
      const response = await axios.get(ROCKET_URL);
      return response.data;
    },
);

export const rocketsSlice = createSlice({
  name: "rocketsSlice",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(getRockets.pending, (state) => {
    state.status = 'loading';
    })
    .addCase(getRockets.fulfilled, (state, action:PayloadAction<any>) => {
    state.status = 'succeeded';
    state.rockets = action.payload;
    })
    .addCase(getRockets.rejected, (state, action) => {
    state.status = 'failed';
    state.error = action.error.message;
    });
  },
});
export const {  } = rocketsSlice.actions;
export const rocketsSelector = (state: RootState) => state.rocketsReducer;
export default rocketsSlice.reducer;