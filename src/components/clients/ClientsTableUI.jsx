import React, {useContext, useRef, useState} from "react";
import {FormExample} from "../form/Form";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import Table from "../table/Table.jsx";
import apiService from "../../api/index.js";
import {MainCtx} from "../../contexts/MainContext";
import Details from "../Details";
import {useNavigate} from 'react-router-dom';
import {toast} from "react-toastify";


function ClientsTableUi() {
    const navigate = useNavigate();
    const {clients, setClients, setShowModal} = useContext(MainCtx);
    const selectRef = useRef(null)

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(event)
        const name = event?.target?.name?.value;
        const number = +event?.target?.phone_number?.value;
        const address = event?.target?.address?.value;
        const status = selectRef.current.value;
        let client = {
            name,
            phone_number: number,
            address: address,
            status: status
        }
        apiService("post", "client/create", client).then(res => {
            setClients([...clients, res.data.client]);
            setShowModal(false)
            toast("Created")
        })
        event.target.reset();
    };

    let clientsForm = [
        {title: 'Ism', id: 'name', type: 'text'},
        {title: 'Telefon raqam', id: 'phone_number', type: 'number'},
        {title: 'Manzil', id: 'address', type: 'text'},
    ]

    let selectOptions = {
        id: 'status',
        option1: 'Holat',
        option2: 'ishonchlilik',
        option3: 'bir martalik',
        option4: "o'rta me'yordagi"
        
    }

    const handleEdit = (id, obj) => {
        console.log(id, obj);
    }

    const showDetails = (id) => {
        navigate(`/clients/${id}`)
    }

    return (
        <div className="h-screen">
            <div className={"max-w-7xl mx-auto px-4  sm:pt-10 sm:px-6 lg:px-8"}>
                <div className="py-5 flex justify-end">
                    <Button onClick={() => setShowModal(true)} children="Mijoz qo'shish" classes="max-sm:hidden block"/>
                    <Button onClick={() => setShowModal(true)} classes="max-sm:block hidden">+</Button>
                </div>

                <div className="flex justify-center">
                    <div className="w-[100%] max-w-full max-sm:overflow-scroll">
                        <Table
                            th_data={[
                                {name: 'Ism', key: 'name', func: () => false},
                                {name: 'Telefon', key: 'phone_number', func: () => false},
                                {name: 'Manzil', key: 'address', func: () => false},
                                {name: 'Holat', key: 'status', func: () => false},
                                {name: '', key: 'status', func: () => true},
                            ]}
                            tb_data={clients}
                            showDetails={showDetails}
                            action2={handleEdit}
                        />
                    </div>
                </div>
            </div>
            <Modal headerContext={'Add a client'}>
                <FormExample functionName={handleSubmit} formContent={clientsForm} selectRef={selectRef}
                             selectOptions={selectOptions}/>
            </Modal>
            <Details form={clientsForm} selectoption={selectOptions}/>
        </div>
    );
}

export default ClientsTableUi;
