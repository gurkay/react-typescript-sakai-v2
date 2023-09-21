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
export const makamKoduSlice = createSlice({
    name: "makamKodu",
    initialState,
    reducers: {
        clearRankCodes:(state) => {
            state.kodlar = [];
            state.kod = { ustKod: 0, kod: 0, aciklama: '' };
        },
        setMakamKodu: (state, action: PayloadAction<Kod>) => {
            state.kod = action.payload;
        },
        setMakamKodlari: (state, action: PayloadAction<Kod>) => {
            state.kodlar.push(action.payload);
        },
    },
});
export const { setMakamKodu, setMakamKodlari, clearRankCodes } = makamKoduSlice.actions;
export const makamKoduSelector = (state: RootState) => state.makamKoduReducer;
export default makamKoduSlice.reducer;