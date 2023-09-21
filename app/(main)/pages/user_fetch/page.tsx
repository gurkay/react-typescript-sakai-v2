'use client';
import React, { useEffect, useState } from "react";
import { fetchUsers, userFetchSelector } from "../../../../src/redux/features/users/userFetchSlice";
import { useAppDispatch, useAppSelector } from "../../../../src/redux/app/hooks";
import { User } from "../../../../src/models/user";
import { getParametreler, parametreSelector } from "../../../../src/redux/features/combobox/parametreSlice";
import { Dropdown } from "primereact/dropdown";

interface InputValue {
    name: string;
    code: string;
}

const UserFetch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [users, setUsers] = useState<Array<User>>([]);
    const [dropdownValue, setDropdownValue] = useState(null);

    const selectedFetchUsers = useAppSelector(userFetchSelector);
    const selectorParametreler = useAppSelector(parametreSelector);
    const dispatch = useAppDispatch();

    function handleFetchUser() {
        dispatch(fetchUsers());
        
        console.log(selectorParametreler.kodlar);
    }

    useEffect(() => {
        setLoading(selectedFetchUsers.loading);
        setError(selectedFetchUsers.error);
        setUsers(selectedFetchUsers.users);
        dispatch(getParametreler());
    }, [selectedFetchUsers]);

    const dropdownValues: InputValue[] = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {users?.map((user) => (
                <li key={user.id}>
                    {user.id} | {user.name} | {user.email}
                </li>
            ))}
             <Dropdown value={dropdownValue} onChange={(e) => setDropdownValue(e.value)} options={dropdownValues} optionLabel="name" placeholder="Select" />
            <button className="btn" onClick={handleFetchUser}>Fetch</button>
        </div>
    );
}

export default UserFetch;