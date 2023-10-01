import { KodState } from "../../interfaces/IKodState";
import { useAppDispatch, useAppSelector } from "../../../../../../src/redux/app/hooks";
import { UstKodConstats } from "../../enum/ust_kod_constants";
import { aracKoduSelector, setAracKodlari, setAracSeciliKodlar } from "../../../../../../src/redux/features/parametreler/aracKoduSlice";
import { setMakamSeciliKodlar } from "../../../../../../src/redux/features/parametreler/makamKoduSlice";
import { MultiSelect } from "primereact/multiselect";
import { Parametre } from "../../interfaces/IParametre";
import { useEffect } from "react";
import { parametreSelector } from "../../../../../../src/redux/features/parametreler/parametreSlice";

interface Props {
    reducer: KodState;
}

export const MyMultiSelect = ({ reducer }: Props) => {

    const dispatch = useAppDispatch();
    const selectorParametreler = useAppSelector(parametreSelector);

    if (reducer.loading === null) {

        selectorParametreler.kodlar.map((item) => {
            console.log(item)
            switch (reducer.kodName) {

                case UstKodConstats.AracKodu:
                    dispatch(setAracKodlari(item));
                    break;
    
                case UstKodConstats.MakamKodu:
           
                    break;
            }
            
        });  

    }

    const setKod = (e: Array<Parametre>) => {

        switch (reducer.kodName) {

            case UstKodConstats.AracKodu:
                dispatch(setAracSeciliKodlar(e));
                break;

            case UstKodConstats.MakamKodu:
                dispatch(setMakamSeciliKodlar(e));
                break;
        }
    }

    return (
        <MultiSelect 
            value={reducer.seciliKodlar} 
            onChange={(e) => setKod(e.value)} 
            options={reducer.kodlar} 
            optionLabel="aciklama" 
            filter placeholder="Select Cities" 
            maxSelectedLabels={3} 
            className="w-full md:w-20rem"
            display="chip"
        />
    );
}