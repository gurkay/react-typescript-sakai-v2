import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import { Parametre } from "../../../../app/(main)/pages/test_page/interfaces/IParametre";
import { initialState } from "../../../../app/(main)/pages/test_page/constants/arac_kodu_initials";

export const aracKoduSlice = createSlice({
    name: "aracKodu",
    initialState,
    reducers: {
        clearToolCodes:(state) => {
            state.kodlar = [];
            state.kod = { ustKod: 0, kod: 0, aciklama: '' };
        },
        setAracKodu: (state, action: PayloadAction<Parametre>) => {
            state.kod = action.payload;
        },
        setAracKodlari: (state, action: PayloadAction<Parametre>) => {
            state.kodlar.push(action.payload);
            console.log('setAracKodlari')
        },
        setAllAracKodlari: (state, action: PayloadAction<Array<Parametre>>) => {
            state.kodlar = (action.payload);
            console.log('setAllAracKodlari')
        },
        setAracSeciliKodlar: (state, action: PayloadAction<Array<Parametre>>) => {
            state.seciliKodlar = (action.payload);
        },
    },
});
export const { setAracKodu, setAracKodlari, clearToolCodes, setAracSeciliKodlar, setAllAracKodlari } = aracKoduSlice.actions;
export const aracKoduSelector = (state: RootState) => state.aracKoduReducer;
export default aracKoduSlice.reducer;