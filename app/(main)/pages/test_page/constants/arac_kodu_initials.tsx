import { KodState } from "../../../../app/(main)/pages/test_page/interfaces/IKodState";

export const initialState: KodState = {
    kodName: 'aracKodu',
    loading: false,
    kodlar: [],
    kod: { ustKod: 0, kod: 0, aciklama: '' },
    seciliKodlar:[],
    error: null
}