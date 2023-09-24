import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Parametre } from "../../../../app/(main)/pages/test_page/interfaces/IParametre";
import { initialState } from "../../../../app/(main)/pages/test_page/constants/makam_kodu_initials";

export const makamKoduSlice = createSlice({
    name: "makamKodu",
    initialState,
    reducers: {
        clearRankCodes:(state) => {
            state.kodlar = [];
            state.kod = { ustKod: 0, kod: 0, aciklama: '' };
        },
        setMakamKodu: (state, action: PayloadAction<Parametre>) => {
            state.kod = action.payload;
        },
        setMakamKodlari: (state, action: PayloadAction<Parametre>) => {
            state.kodlar.push(action.payload);
        },
        setSilSeciliKodlar: (state, action: PayloadAction<Array<Parametre>>) => {
            state.seciliKodlar = [];
        },
        setMakamSeciliKodlar: (state, action: PayloadAction<Array<Parametre>>) => {
            state.seciliKodlar = (action.payload);
        },
    },
});
export const { setMakamKodu, setMakamKodlari, clearRankCodes,setMakamSeciliKodlar, setSilSeciliKodlar } = makamKoduSlice.actions;
export const makamKoduSelector = (state: RootState) => state.makamKoduReducer;
export default makamKoduSlice.reducer;