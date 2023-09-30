import React, { useEffect } from 'react';
import { getRockets, rocketsSelector } from '../../../../../../src/redux/features/rockets/rocketsSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../src/redux/app/hooks';


export const RocketsIndex = () => {
    const dispatch = useAppDispatch();
    const selectorRockets = useAppSelector(rocketsSelector);

    useEffect(() => {
        if (selectorRockets.status === 'idle') {
            dispatch(getRockets());
        }
    }, [selectorRockets.status, dispatch]);

    let contentToDisplay: any = '';

    if (selectorRockets.status === 'loading') {
        console.log('loading')
        contentToDisplay = <h2>Loading...</h2>;
    } else if (selectorRockets.status === 'succeeded') {
        console.log('succeeded')
        contentToDisplay = selectorRockets.rockets.map((item) => (
            <div key={item.id}>
                <h2>{item.rocket_name}</h2>
                <p>{item.description}</p>
                <hr />
            </div>
        ));
    } else if (selectorRockets.status === 'failed') {
        console.log('failed')
        contentToDisplay = <p>{selectorRockets.error}</p>;
    }

    return (
        <div>
            <h1>Rockets page</h1>
            {contentToDisplay}
        </div>
    );
};