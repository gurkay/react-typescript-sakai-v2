import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../../src/redux/app/hooks';
import { MyMultiSelect } from '../my_multi_select/MyMultiSelect';
import { aracKoduSelector, getAracKodlari, setAllAracKodlari, setAracKodlari } from '../../../../../../src/redux/features/parametreler/aracKoduSlice';
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
    const selectorAracKodlari = useAppSelector(aracKoduSelector)
    useEffect(() => {
        //fillCodes();
        console.log('selectorParametreler useEffect...')
        if (reducer.loading === null) {
            console.log('selectorParametreler.loading: ' + reducer.loading)
            dispatch(getParametreler());
        }


    }, [dispatch]);
    
    useEffect(() => {
        if(selectorAracKodlari.loading === null) {
            dispatch(getAracKodlari(reducer.kodlar));
        }

    }, [dispatch]);


    let parametreToDisplay: any;

    if (reducer.loading === true) {
        console.log('selectorParametreler.loading: ' + reducer.loading)
        parametreToDisplay = <ProgressSpinner />;

    } else if (reducer.loading === false) {
        console.log('selectorParametreler.loading: ' + reducer.loading)
        console.log(reducer.kodlar);
        console.log(selectorAracKodlari)

        
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