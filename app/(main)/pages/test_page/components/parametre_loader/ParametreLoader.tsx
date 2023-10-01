import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../src/redux/app/hooks';
import { MyMultiSelect } from '../my_multi_select/MyMultiSelect';
import { aracKoduSelector, setAllAracKodlari, setAracKodlari } from '../../../../../../src/redux/features/parametreler/aracKoduSlice';
import { makamKoduSelector, setMakamKodlari } from '../../../../../../src/redux/features/parametreler/makamKoduSlice';
import { Parametre } from '../../interfaces/IParametre';
import { getParametreler, parametreSelector } from '../../../../../../src/redux/features/parametreler/parametreSlice';
import { ProgressSpinner } from 'primereact/progressspinner';
import { KodState } from '../../interfaces/IKodState';

interface Props {
    reducer : KodState
}

export const ParametreLoader = ({reducer} : Props) => {
    const dispatch = useAppDispatch();
    const selectorParameter = useAppSelector(parametreSelector)

    useEffect(() => {
        //fillCodes();
        console.log('selectorParametreler useEffect...')
        if (reducer.loading === null) {
            console.log('selectorParametreler.loading: ' + reducer.loading)
            dispatch(getParametreler());
        }
    }, [reducer.loading, selectorParameter]);

    let parametreToDisplay: any;

    if (reducer.loading === true) {
        console.log('selectorParametreler.loading: ' + reducer.loading)
        parametreToDisplay = <ProgressSpinner />;

    } else if (reducer.loading === false) {
        console.log('selectorParametreler.loading: ' + reducer.loading)
        reducer.kodlar.map((item) => {
                switch (item.ustKod) {
                    case 0:
                        
                        break;
                    case 1:

                        
                        break;
                } 
        });    

        
    } else if (reducer.loading === undefined) {
        console.log('selectorParametreler.loading: ' + reducer.loading)
        parametreToDisplay = reducer.error;

    }

    return (

        
        <div>
            {parametreToDisplay}

    </div>
        
    );
};