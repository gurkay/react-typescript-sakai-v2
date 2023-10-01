import React, { useEffect } from 'react';
import { getRockets, rocketsSelector } from '../../../../../../src/redux/features/rockets/rocketsSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../src/redux/app/hooks';

interface _InitialState {
    rockets: Array<any>,
    status: string,
    loading: boolean | null | undefined,
    error: string | undefined
}

interface _Props {
    reducer : _InitialState
}

export const RocketsIndex = ({reducer} : _Props) => {
    const dispatch = useAppDispatch();
    const selectorRockets = useAppSelector(rocketsSelector);

    useEffect(() => {
        if (reducer.status === 'idle') {
            dispatch(getRockets());
        }
    }, [reducer.status, dispatch]);

    let contentToDisplay: any = '';

    if (reducer.status === 'loading') {
        console.log('loading')
        contentToDisplay = <h2>Loading...</h2>;
    } else if (reducer.status === 'succeeded') {
        console.log('succeeded')
        contentToDisplay = reducer.rockets.map((item) => (
            <div key={item.id}>
                <h2>{item.rocket_name}</h2>
                <p>{item.description}</p>
                <hr />
            </div>
        ));
    } else if (reducer.status === 'failed') {
        console.log('failed')
        contentToDisplay = <p>{reducer.error}</p>;
    }

    return (
        <div>
            <h1>Rockets page</h1>
            {contentToDisplay}
        </div>

        
    );
};