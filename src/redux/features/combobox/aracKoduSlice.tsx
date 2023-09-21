import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Kod } from "./IKod";

interface KodState {
    kodlar: Array<Kod>;
    kod: Kod;
}

const initialState: KodState = {
    kodlar: [],
    kod: { ustKod: 0, kod: 0, aciklama: '' }
}
export const aracKoduSlice = createSlice({
    name: "aracKodu",
    initialState,
    reducers: {
        clearToolCodes:(state) => {
            state.kodlar = [];
            state.kod = { ustKod: 0, kod: 0, aciklama: '' };
        },
        setAracKodu: (state, action: PayloadAction<Kod>) => {
            state.kod = action.payload;
        },
        setAracKodlari: (state, action: PayloadAction<Kod>) => {
            state.kodlar.push(action.payload);
        },
    },
});
export const { setAracKodu, setAracKodlari, clearToolCodes } = aracKoduSlice.actions;
export const aracKoduSelector = (state: RootState) => state.aracKoduReducer;
export default aracKoduSlice.reducer;