import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Kod } from "./IKod";
import { AboneGDSService } from "../../../../app/(main)/service/AboneGDSService";
import axios from "axios";

interface KodState {
    loading: boolean;
    kodlar: Array<Kod>;
    kod: Kod;
    error: any;
}

const initialState: KodState = {
    loading: false,
    kodlar: [],
    kod: { ustKod: 0, kod: 0, aciklama: '' },
    error: ''
}

export const getParametreler = createAsyncThunk(
    "parametreler",
    () => {
        const res = axios.get('/demo/data/parametreler.json').then((res) => res.data.data);
        return Promise.resolve(res);
    }
  )

export const parametreSlice = createSlice({
    name: "parametre",
    initialState,
    reducers: {
        setKod: (state, action: PayloadAction<Kod>) => {
            state.kod = action.payload;
        },
        setKodlar: (state, action: PayloadAction<Kod>) => {
            state.kodlar.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getParametreler.pending, (state) => {
          state.loading = true;
        });
        builder.addCase(getParametreler.fulfilled, (state, action: PayloadAction<Array<Kod>>) => {
          state.loading = false;
          state.kodlar = action.payload;
        });
        builder.addCase(getParametreler.rejected, (state, action) => {
          state.loading = false;
          state.kodlar = [];
          state.error = action.error.message;
        });
      },
});
export const { setKod, setKodlar } = parametreSlice.actions;
export const parametreSelector = (state: RootState) => state.parametreReducer;
export default parametreSlice.reducer;