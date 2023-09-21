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
        setKod: (state, action: PayloadAction<Kod>) => {
            state.kod = action.payload;
        },
        setKodlar: (state, action: PayloadAction<Kod>) => {
            state.kodlar.push(action.payload);
        },
    },
});
export const { setKod } = aracKoduSlice.actions;
export const aracKoduSelector = (state: RootState) => state.aracKoduReducer;
export default aracKoduSlice.reducer;