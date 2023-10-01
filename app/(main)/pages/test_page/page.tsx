'use client';
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../src/redux/app/hooks";
import { aracKoduSelector, clearToolCodes, setAracKodlari } from "../../../../src/redux/features/parametreler/aracKoduSlice";
import { MyDropdown } from "./components/my_dropdown/MyDropdown";
import { getParametreler, parametreSelector } from "../../../../src/redux/features/parametreler/parametreSlice";
import { clearRankCodes, makamKoduSelector, setMakamKodlari } from "../../../../src/redux/features/parametreler/makamKoduSlice";
import { MyMultiSelect } from "./components/my_multi_select/MyMultiSelect";
import { Button } from "primereact/button";
import { RocketsIndex } from "./components/rockets/RocketsIndex";
import { getRockets, rocketsSelector } from "../../../../src/redux/features/rockets/rocketsSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import { ParametreLoader } from "./components/parametre_loader/ParametreLoader";

const TestPage = () => {
    const selectorParametreler = useAppSelector(parametreSelector);
    const selectorRockets = useAppSelector(rocketsSelector);
    const selectorAracKodlari = useAppSelector(aracKoduSelector);
    const submitButton = () => {
        const selectorAracKodlari = useAppSelector(aracKoduSelector);
        const selectorMakamKodlari = useAppSelector(makamKoduSelector);
        let parametre = '/parametre?'
        const aracKodu = 'aracKodu=';
        console.log(selectorAracKodlari.seciliKodlar.map((item) => {

            console.log(aracKodu + item.kod)
            parametre += aracKodu + item.kod;
            if (selectorAracKodlari.seciliKodlar.lastIndexOf(item) != -1) {
                parametre += '&';
            }
        }))
        console.log('parametre: ' + parametre);
        console.log(selectorMakamKodlari.seciliKodlar.map((item) => {
            console.log(item.kod)
        }))
    }

    // Sample JSON data
    const jsonData = {
        unit1: {
            subunit1: {},
            subunit2: {
                subsubunit1: {},
                subsubunit2: {},
            },
        },
        unit2: {},
    };

    // Recursive component to render units and subunits
    const TreeNode = ({ data }: any) => {
        return (
            <ul>
                {Object.keys(data).map((key, index) => (
                    <li key={key}>
                        {index} {key}
                        {Object.keys(data[key]).length > 0 && (
                            <TreeNode data={data[key]} />
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            <ParametreLoader reducer={selectorParametreler} />
            <div className="col-12">
                <div className="card">
                    <h6>Araç Kodları</h6>
                    <MyMultiSelect reducer={selectorAracKodlari} />
                </div>
            </div>
            <RocketsIndex reducer={selectorRockets} />

            <div className="col-12">
                <h1>Tree Structure</h1>
                <TreeNode data={jsonData} />
            </div>


            <div className="col-12">
                <div className="card">
                    <Button label="Submit" onClick={submitButton}></Button>
                </div>
            </div>

        </div>
    );
}

export default TestPage;