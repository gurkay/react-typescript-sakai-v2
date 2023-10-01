import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { initialState } from "../../../../app/(main)/pages/test_page/constants/parametre_initials";
import { Parametre } from "../../../../app/(main)/pages/test_page/interfaces/IParametre";
import { KodState } from "../../../../app/(main)/pages/test_page/interfaces/IKodState";

export const getParametreler = createAsyncThunk(
  "parametreler",
   () => {
    const res =  axios.get('/demo/data/parametreler.json').then((res) => res.data.data);
    return Promise.resolve(res);
  }
);

export const parametreSlice = createSlice({
  name: "parametre",
  initialState,
  reducers: {
    setParametreKod: (state, action: PayloadAction<Parametre>) => {
      state.kod = action.payload;
    },
    setParametreKodlar: (state, action: PayloadAction<Parametre>) => {
      state.kodlar.push(action.payload);
    },
    setKod: (state, action: PayloadAction<Parametre>) => {
      state.kod = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getParametreler.pending, (state) => {
      state.loading = true;
    })
    .addCase(getParametreler.fulfilled, (state, action: PayloadAction<Array<Parametre>>) => {
      state.loading = false;
      state.kodlar = action.payload;
    })
    .addCase(getParametreler.rejected, (state, action) => {
      state.loading = undefined;
      state.kodlar = [];
      state.error = action.error.message;
    });
  },
});
export const { setParametreKodlar, setParametreKod, setKod } = parametreSlice.actions;
export const parametreSelector = (state: RootState) => state.parametreReducer;
export default parametreSlice.reducer;