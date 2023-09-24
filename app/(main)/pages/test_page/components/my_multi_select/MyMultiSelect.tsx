import { KodState } from "../../interfaces/IKodState";
import { useAppDispatch, useAppSelector } from "../../../../../../src/redux/app/hooks";
import { UstKodConstats } from "../../enum/ust_kod_constants";
import { setAracSeciliKodlar } from "../../../../../../src/redux/features/parametreler/aracKoduSlice";
import { setMakamSeciliKodlar } from "../../../../../../src/redux/features/parametreler/makamKoduSlice";
import { MultiSelect } from "primereact/multiselect";
import { Parametre } from "../../interfaces/IParametre";

interface Props {
    props: KodState;
}

export const MyMultiSelect = ({ props }: Props) => {

    const dispatch = useAppDispatch();

    const setKod = (e: Array<Parametre>) => {

        switch (props.kodName) {

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
            value={props.seciliKodlar} 
            onChange={(e) => setKod(e.value)} 
            options={props.kodlar} 
            optionLabel="aciklama" 
            filter placeholder="Select Cities" 
            maxSelectedLabels={3} 
            className="w-full md:w-20rem"
            display="chip"
        />
    );
}