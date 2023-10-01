import { KodState } from "../interfaces/IKodState";

export const initialState: KodState = {
    kodName: 'aracKodu',
    loading: null,
    kodlar: [],
    kod: { ustKod: 0, kod: 0, aciklama: '' },
    seciliKodlar: [],
    error: null
}