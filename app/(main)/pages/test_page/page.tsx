'use client';
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../src/redux/app/hooks";
import { aracKoduSelector, clearToolCodes, setAracKodlari } from "../../../../src/redux/features/parametreler/aracKoduSlice";
import { MyDropdown } from "./components/my_dropdown/MyDropdown";
import { getParametreler, parametreSelector } from "../../../../src/redux/features/parametreler/parametreSlice";
import { clearRankCodes, makamKoduSelector, setMakamKodlari } from "../../../../src/redux/features/parametreler/makamKoduSlice";
import { MyMultiSelect } from "./components/my_multi_select/MyMultiSelect";

const TestPage = () => {
    const selectorParametreler = useAppSelector(parametreSelector);
    const selectorAracKodlari = useAppSelector(aracKoduSelector);
    const selectorMakamKodlari = useAppSelector(makamKoduSelector);
    const dispatch = useAppDispatch();

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

    return (
        <div>
            <div>
                <h6>Araç Kodları</h6>
                <MyDropdown props={selectorAracKodlari} />
            </div>
            
            <div>
                <h6>Makam Kodları</h6>
                <MyMultiSelect props={selectorMakamKodlari} />
            </div>
        </div>
    );
}

export default TestPage;