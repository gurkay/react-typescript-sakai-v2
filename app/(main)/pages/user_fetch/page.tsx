'use client';
import React, { useEffect, useState } from "react";
import { fetchUsers, userFetchSelector } from "../../../../src/redux/features/users/userFetchSlice";
import { useAppDispatch, useAppSelector } from "../../../../src/redux/app/hooks";
import { User } from "../../../../src/models/user";
import { getParametreler, parametreSelector } from "../../../../src/redux/features/combobox/parametreSlice";
import { Dropdown } from "primereact/dropdown";
import { aracKoduSelector, clearToolCodes, setAracKodlari } from "../../../../src/redux/features/combobox/aracKoduSlice";
import { clearRankCodes, makamKoduSelector, setMakamKodlari } from "../../../../src/redux/features/combobox/makamKoduSlice";

interface InputValue {
    name: string;
    code: number;
}

const UserFetch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [users, setUsers] = useState<Array<User>>([]);
    const [dropdownValue, setDropdownValue] = useState(null);

    const selectedFetchUsers = useAppSelector(userFetchSelector);

    const selectorParametreler = useAppSelector(parametreSelector);
    const selectorMakamKodlari = useAppSelector(makamKoduSelector);
    const selectorAracKodlari = useAppSelector(aracKoduSelector);

    const dispatch = useAppDispatch();

    function handleFetchUser() {
        dispatch(fetchUsers());
    }

    useEffect(() => {
        setLoading(selectedFetchUsers.loading);
        setError(selectedFetchUsers.error);
        setUsers(selectedFetchUsers.users);
    }, [selectedFetchUsers]);

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

        console.log('arac kodu: '+selectorAracKodlari.kodlar.map((item) => {console.log(item.aciklama)}));
        console.log('makam kodu: '+selectorMakamKodlari.kodlar.map((item) => {console.log(item.aciklama)}));

    }

    let dropdownValues: InputValue[] = [
        { name: 'New York', code: 0 },
        { name: 'Rome', code: 1 },
        { name: 'London', code: 2 },
        { name: 'Istanbul', code: 3 },
        { name: 'Paris', code: 4 }
    ];

    const getValue = (key:number) => {
        switch (key) {
            case 0:
                return {name: selectorAracKodlari.kod.aciklama, code: selectorAracKodlari.kod.kod};
                case 1:
                    return {name: selectorMakamKodlari.kod.aciklama, code: selectorMakamKodlari.kod.kod};
        }
        selectorAracKodlari.kodlar.map((item) => {
            console.log(item.aciklama)
        });
    }

    const getValues = (key:number) => {
        dropdownValues = [];
        switch (key) {
            case 0:
                selectorAracKodlari.kodlar.map((item) => {
                    dropdownValues.push({name: item.aciklama, code: item.kod})
                });
                break;
                case 1:
                    selectorMakamKodlari.kodlar.map((item) => {
                        dropdownValues.push({name: item.aciklama, code: item.kod})
                    });
                    break;
        }
        return dropdownValues;
    }

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {users?.map((user) => (
                <li key={user.id}>
                    {user.id} | {user.name} | {user.email}
                </li>
            ))}
            <Dropdown value={getValue(1)} onChange={(e) => console.log(e.value)} options={getValues(1)} optionLabel="name" placeholder="Select" />
            <button className="btn" onClick={handleFetchUser}>Fetch</button>
        </div>
    );
}

export default UserFetch;