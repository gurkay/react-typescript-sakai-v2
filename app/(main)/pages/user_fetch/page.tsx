'use client';
import React, { useEffect, useState } from "react";
import { fetchUsers, userFetchSelector } from "../../../../src/redux/features/users/userFetchSlice";
import { useAppDispatch, useAppSelector } from "../../../../src/redux/app/hooks";
import { User } from "../../../../src/models/user";
import { Dropdown } from "primereact/dropdown";
import { aracKoduSelector, clearToolCodes, setAracKodlari } from "../../../../src/redux/features/parametreler/aracKoduSlice";
import { MultiSelect } from "primereact/multiselect";
import { getParametreler, parametreSelector } from "../../../../src/redux/features/parametreler/parametreSlice";
import { clearRankCodes, makamKoduSelector, setMakamKodlari } from "../../../../src/redux/features/parametreler/makamKoduSlice";

interface InputValue {
    ustKod: number;
    kod: number;
    aciklama: string;
}

interface InputCombobox {
    name: string;
    code: string;
}

const UserFetch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [users, setUsers] = useState<Array<User>>([]);

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

    }

    var dropdownValues: InputValue[] = [];

    const getValue = (key: number) => {
        switch (key) {
            case 0:
                return { ustKod: selectorAracKodlari.kod.ustKod, kod: selectorAracKodlari.kod.kod, aciklama: selectorAracKodlari.kod.aciklama };
            case 1:
                return { ustKod: selectorMakamKodlari.kod.ustKod, kod: selectorMakamKodlari.kod.kod, aciklama: selectorMakamKodlari.kod.aciklama };
        }
    }

    const getValues = (key: number) => {
        dropdownValues = [];
        switch (key) {
            case 0:
                selectorAracKodlari.kodlar.map((item) => {
                    dropdownValues.push({ ustKod: item.ustKod, kod: item.kod, aciklama: item.aciklama })
                });
                break;
            case 1:
                selectorMakamKodlari.kodlar.map((item) => {
                    dropdownValues.push({ ustKod: item.ustKod, kod: item.kod, aciklama: item.aciklama })
                });
                break;
        }
        return dropdownValues;
    }

    const selectedCountryTemplate = (option:InputValue, props:any) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.aciklama}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option:InputValue) => {
        return (
            <div className="flex align-items-center">
                <div>{option.aciklama}</div>
            </div>
        );
    };

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {users?.map((user) => (
                <li key={user.id}>
                    {user.id} | {user.name} | {user.email}
                </li>
            ))}
            {
                selectorParametreler.kodlar.map((item) => (
                    (item.aciklama == 'Seçiniz') ?
                        <Dropdown
                            value={getValue(item.ustKod)}
                            onChange={(e) => console.log(e.value)}
                            options={getValues(item.ustKod)}
                            optionLabel="aciklama" 
                            placeholder="Select"
                            valueTemplate={selectedCountryTemplate} 
                            itemTemplate={countryOptionTemplate} 
                            filter
                        />
                        : null
                ))
            }

            <button className="btn" onClick={handleFetchUser}>Fetch</button>
        </div>
    );
}

export default UserFetch;