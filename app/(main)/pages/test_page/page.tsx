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
import { setInterval } from "timers/promises";

const TestPage = () => {
    const dispatch = useAppDispatch();
    const selectorParametreler = useAppSelector(parametreSelector);
    const selectorAracKodlari = useAppSelector(aracKoduSelector);
    const selectorMakamKodlari = useAppSelector(makamKoduSelector);

    const selectorRockets = useAppSelector(rocketsSelector);
    
    useEffect(() => {
        fillCodes();
    }, []);

    const fillCodes = () => {
        dispatch(getParametreler());
        dispatch(clearToolCodes());
        dispatch(clearRankCodes());
        selectorParametreler.kodlar.map((item) => {
            switch (item.ustKod) {
                case 0:
                    dispatch(setAracKodlari(item));
                    break;
                case 1:
                    dispatch(setMakamKodlari(item));
                    break;
            }
        });
    }

    useEffect(() => {
        if(selectorRockets.loading === null) {
            dispatch(getRockets());
        }
    }, [selectorRockets.loading, dispatch]);

    let contentToDisplay: any;

    if(selectorRockets.loading === true) {
    
        contentToDisplay = <h1>loading...</h1>;
    } else {
        contentToDisplay = <h1>oldu</h1>;
    }

    const submitButton = () => {
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
            {
                contentToDisplay
            }
           

            <div className="col-12">
                <h1>Tree Structure</h1>
                <TreeNode data={jsonData} />
            </div>

            <div className="col-12">
                <div className="card">
                    <h6>Araç Kodları</h6>
                    <MyMultiSelect props={selectorAracKodlari} />
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h6>Makam Kodları</h6>
                    <MyMultiSelect props={selectorMakamKodlari} />
                </div>
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