import React, {useContext} from "react";
import Button from "./button/Button";
import Modal from "./modal/Modal";
import Table from "./table/Table.jsx";
import {MainCtx} from "../contexts/MainContext";
import {FormExample} from "./form/Form";
import apiService from '../api/index'
import Details from "./Details";

function MarketUI() {
    const {market, setMarket, setShowModal, setDetails, setIsDetailed} = useContext(MainCtx);

    const handleDelete = (id) => {
        apiService("delete", `market/${id}`).then(res => {
            setMarket(market.filter(d => d._id !== id));
            return true;
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const bail_payment = event.target.bail_payment.value;
        const quantity = event.target.quantity.value;

        let order = {
            bail_payment,
            quantity,
        }
        apiService("post", "market/create", order).then(res => {
            setProducts([...market, res.data.order]);
            setShowModal(false)
        })
        event.target.reset();
    };

    let marketForm = [
        {title: 'Bail Payment', id: 'bail_payment', type: 'number'},
        {title: 'quantity', id: 'quantity', type: 'number'},
    ]

    const showDetails = (id) => {
        apiService("get", `market/${id}`).then(res => {
            setDetails(res.data.order);
            setIsDetailed(true)
        })
    }

    return (
        <div className="h-screen">
            <div className={"max-w-7xl mx-auto px-4  sm:pt-10 sm:px-6 lg:px-8"}>
                <div className="py-5 flex justify-end">
                    <Button onClick={() => setShowModal(true)} children="Add  an Order" classes="max-sm:hidden block"/>
                    <Button onClick={() => setShowModal(true)} classes="max-sm:block hidden">+</Button>
                </div>
                <div className="flex justify-center">
                    <div className="w-full max-w-full max-sm:overflow-scroll">
                        <Table tb_data={market} th_data={[
                            {name: 'Bail Payment', key: 'bail_payment', func: () => false},
                            {name: 'Quantity', key: 'quantity', func: () => false},
                            {name: 'Created At', key: 'createdAt', func: () => false},
                            {name: 'Action', key: 'status', func: () => true},
                        ]} action1={handleDelete} showDetails={showDetails}/>
                    </div>
                </div>
            </div>
            <Modal
                headerContext={'Add an order'}
            >
                <FormExample functionName={handleSubmit} formContent={marketForm}/>
            </Modal>
            <Details form={marketForm}/>

        </div>
    );
}

export default MarketUI;
