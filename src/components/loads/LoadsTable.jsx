import React, {useContext, useState} from "react";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import Table from "../table/Table.jsx";
import {MainCtx} from "../../contexts/MainContext";
import {FormExample} from "../form/Form";
import apiService from '../../api/index'
import Details from "../Details";
import {useNavigate} from "react-router-dom";
import EditModal from "../modal/EditModal.jsx";

function LoadsTableUi() {
    const navigate = useNavigate()
    const {loads, setLoads, setShowModal, setEditModal, setDetails} = useContext(MainCtx);
    const [editObj, setEditObj] = useState(null);

    const addLoad = (e) => {
        e.preventDefault();
        let newObj = {
            client_name: e.target[0].value,
            client_phone_number: e.target[1].value,
            address: e.target[2].value,
            net_cost: e.target[3].value,
        }
        if (newObj.client_name !== "" && newObj.client_phone_number !== "" && newObj.address !== "" && newObj.cost !== "") {
            apiService("post", "load/create", newObj).then(res => {
                setLoads([...loads, res.data.load]);
                setShowModal(false);
            })
            e.target.reset()
        }
    }

    let loadsForm = [
        {title: 'Ism', id: 'client_name', type: 'text'},
        {title: 'Telefon raqam', id: 'client_phone_number', type: 'number'},
        {title: 'Manzil', id: 'address', type: 'text'},
        {title: 'Xarajat', id: 'net_cost', type: 'text'},
    ]

    const handleEdit = (edit, obj) => {
        console.log(obj);
        setEditModal(true);
        setEditObj(obj);
    }

    const showDetails = (id) => {
        navigate(`/load/${id}`)
    }

    return (
        <div className="h-screen">
            <div className={"max-w-7xl mx-auto px-4  sm:pt-10 sm:px-6 lg:px-8"}>
                <div className="py-5 flex justify-end">
                    <Button
                        onClick={() => setShowModal(true)}
                        children="Yuk qo'shish"
                        classes="max-sm:hidden block"
                    />
                    <Button
                        onClick={() => setShowModal(true)}
                        classes="max-sm:block hidden">+</Button>
                </div>

                <div className="flex justify-center">
                    <div className="w-[100%] max-w-full max-sm:overflow-scroll">
                        <Table tb_data={loads}
                               th_data={[
                                   {name: 'Ism', key: 'client_name', func: () => false},
                                   {name: 'Telefon raqam', key: 'client_phone_number', func: () => false},
                                   {name: 'xarajat', key: 'net_cost', func: () => false},
                                   {name: 'Manzil', key: 'address', func: () => false},
                                   {name: 'Kiritilgan vaqt', key: 'createdAt', func: () => false},
                                   {name: 'Amallar', key: 'status', func: () => true},
                               ]} action2={handleEdit} showDetails={showDetails}/>
                    </div>
                </div>
            </div>
            <Modal headerContext={"Yuk qo'shish"}>
                <FormExample functionName={addLoad} formContent={loadsForm}/>
            </Modal>
            <EditModal headerContext={'Edit load'}>
                {editObj?.net_cost}
            </EditModal>
            <Details form={loadsForm}/>
        </div>
    );
}

export default LoadsTableUi;
