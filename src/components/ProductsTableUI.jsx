import React, {useContext, useRef, useState} from "react";
import {FormExample} from "./form/Form";
import Button from "./button/Button";
import Modal from "./modal/Modal";
import Table from "./table/Table.jsx";
import apiService from "../api/index.js";
import { MainCtx } from "../contexts/MainContext"; 
import Details from "./Details";

function ProductsTableUI() {
    const [test, settest ] = useState(false)
    const {products, setProducts, setShowModal, setDetails, isDetailed, setIsDetailed} = useContext(MainCtx);  
    const handleDelete = (id) => { 
        apiService("delete", `product/${id}`).then(res => {
            setProducts(products.filter(d => d._id !== id));
            return true;
        });
    } 


    const handleSubmit = (event) => {
        event.preventDefault();
        const type = event.target.type.value;
        const name = event.target.name.value; 
        const net_cost = event.target.net_cost.value;
        const solt_cost = event.target.solt_cost.value;
        const is_discount = event.target.is_discount.checked;
        const discount_number = event.target.discount_number.value;
        const discount_price = event.target.discount_price.value; 
        let product = {
            type,
            name,
            net_cost,
            solt_cost,
            is_discount,
            discount_number,
            discount_price,
        }    
        apiService("post", "product/create", product).then(res => { 
            setProducts([...products, res.data.product]);
            setShowModal(false)
        }) 
        event.target.reset();
    };

    let productsForm = [
        {title: 'Mahsulot turi', id: 'type', type: 'text'},
        {title: 'Ism', id: 'name', type: 'text'},
        {title: 'Tan narxi', id: 'net_cost', type: 'number', class: 'numberInput'},
        {title: 'Sotilgan narxi', id: 'solt_cost', type: 'number', class: 'numberInput'}, 
        {title: 'Chegirma', id: 'is_discount', type: 'checkbox', class: 'checkboxInput'}, 
        {title: 'Chegirma raqami', id: 'discount_number', type: 'number', class: 'numberInput'}, 
        {title: 'Chegirma qiymati', id: 'discount_price', type: 'number', class: 'numberInput'}, 
    ]

    const showDetails = (id) => {
        apiService("get", `product/${id}`).then(res => { 
            setDetails(res.data.product); 
            setIsDetailed(true)    
        })
    }

    return (
        <div className="h-screen">
            <div className={"max-w-7xl mx-auto px-4  sm:pt-10 sm:px-6 lg:px-8"}>
                <div className="py-5 flex justify-end">
                    <Button onClick={() => setShowModal(true)} children="Mahsulot qo'shish" classes="max-sm:hidden block"/>
                    <Button onClick={() => setShowModal(true)} classes="max-sm:block hidden">+</Button>
                </div> 
                <div className="flex justify-center"> 
                    <div className="w-full max-w-full max-sm:overflow-scroll">
                        <Table tb_data={products} th_data={[
                            {name: 'Mahsulot turi', key: 'type', func: () => false},
                            {name: 'Ism', key: 'name', func: () => false},
                            {name: 'Qiymat', key: 'quantity', func: () => false},
                            {name: 'Tan narx', key: 'net_cost', func: () => false},
                            {name: 'Sotilgan narx', key: 'solt_cost', func: () => false},
                            {name: '', key: 'status', func: () => true},
                        ]} action1={handleDelete} showDetails={showDetails}/>
                    </div>
                </div>
            </div>
            <Modal
                headerContext = {"Mahsulot qo'shish"} 
            >
                <FormExample functionName={handleSubmit} formContent={productsForm}/>
            </Modal>
            <Details form={productsForm}/>

        </div>
    );
}

export default ProductsTableUI;
