import { Dropdown } from "primereact/dropdown";
import { KodState } from "../../interfaces/IKodState";
import { useAppDispatch } from "../../../../../../src/redux/app/hooks";
import { UstKodConstats } from "../../enum/ust_kod_constants";
import { setAracKodu } from "../../../../../../src/redux/features/parametreler/aracKoduSlice";
import { setMakamKodu } from "../../../../../../src/redux/features/parametreler/makamKoduSlice";
import { Parametre } from "../../interfaces/IParametre";

interface Props {
    props: KodState;
}

export const MyDropdown = ({ props }: Props) => {

    const dispatch = useAppDispatch();

    const selectedTemplate = (option: Parametre, props: any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.aciklama}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const optionTemplate = (option: Parametre) => {
        return (
            <div className="flex align-items-center">
                <div>{option.aciklama}</div>
            </div>
        );
    };

    const setKod = (e: Parametre) => {
        
        switch (props.kodName) {

            case UstKodConstats.AracKodu:
                dispatch(setAracKodu(e));
                break;

            case UstKodConstats.MakamKodu:
                dispatch(setMakamKodu(e));
                break;
        }
    }

    return (
        <Dropdown
            value={props.kod}
            onChange={(e) => setKod(e.value)}
            options={props.kodlar}
            optionLabel="aciklama"
            placeholder="Select"
            valueTemplate={selectedTemplate}
            itemTemplate={optionTemplate}
            filter
        />
    );
}