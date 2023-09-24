import { Parametre } from "./IParametre";

export interface KodState {
    kodName: string;
    loading: boolean;
    kodlar: Array<Parametre>;
    kod: Parametre;
    seciliKodlar: Array<Parametre>;
    error: any;
}