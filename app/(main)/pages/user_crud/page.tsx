'use client';
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { User } from "../../../../src/models/user";
import { InputText } from "primereact/inputtext";

import { useAppDispatch, useAppSelector } from "../../../../src/redux/app/hooks";
import { fetchUsers, userFetchSelector } from "../../../../src/redux/features/users/userFetchSlice";

const UserCrud = () => {
    const toast = useRef<Toast>(null);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const dt = useRef<DataTable<any>>(null);
    const [globalFilter, setGlobalFilter] = useState('');

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [users, setUsers] = useState<Array<User>>([]);
    const selectedFetchUsers = useAppSelector(userFetchSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setLoading(selectedFetchUsers.loading);
        setError(selectedFetchUsers.error);
        setUsers(selectedFetchUsers.users);
        dispatch(fetchUsers());
    }, [selectedFetchUsers]);

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Users</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" severity="success" className=" mr-2" onClick={()=>{}} />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={()=>{}} disabled={!selectedUsers || !(selectedUsers as any).length} />
                </div>
            </React.Fragment>
        );
    };
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Export" icon="pi pi-upload" severity="help" onClick={()=>{}} />
            </React.Fragment>
        );
    };
    const actionBodyTemplate = (rowData: User) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => {}} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => {}} />
            </>
        );
    };
    const idBodyTemplate = (rowData: User) => {
        return (
            <>
                <span className="p-column-title">ID</span>
                {rowData.id}
            </>
        );
    };
    const nameBodyTemplate = (rowData: User) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    };
    const emailBodyTemplate = (rowData: User) => {
        return (
            <>
                <span className="p-column-title">E-mail</span>
                {rowData.email}
            </>
        );
    };
    return (
        <div className="grid user-crud">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable
                        ref={dt}
                        value={users}
                        selection={selectedUsers}
                        onSelectionChange={(e) => setSelectedUsers(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                        globalFilter={globalFilter}
                        emptyMessage="No products found."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="ID" sortable body={idBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="name" header="Name" sortable body={nameBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column field="emai" header="E-mail" sortable body={emailBodyTemplate} headerStyle={{ minWidth: '15rem' }}></Column>
                        <Column body={actionBodyTemplate} headerStyle={{ minWidth: '10rem' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

export default UserCrud;