'use client';
import React, { useEffect, useState } from "react";
import { fetchUsers, userFetchSelector } from "../../../../src/redux/features/users/userFetchSlice";
import { useAppDispatch, useAppSelector } from "../../../../src/redux/app/hooks";
import { User } from "../../../../src/models/user";



const UserFetch = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [users, setUsers] = useState<Array<User>>([]);
    const selectedFetchUsers = useAppSelector(userFetchSelector);
    const dispatch = useAppDispatch();

    function handleFetchUser() {
        dispatch(fetchUsers());
    }

    useEffect(() => {
        setLoading(selectedFetchUsers.loading);
        setError(selectedFetchUsers.error);
        setUsers(selectedFetchUsers.users);
        
    }, [selectedFetchUsers]);

    return (
        <div>
            {loading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {users?.map((user) => (
                <li key={user.id}>
                    {user.id} | {user.name} | {user.email}
                </li>
            ))}
            <button className="btn" onClick={handleFetchUser}>Fetch</button>
        </div>
    );
}

export default UserFetch;