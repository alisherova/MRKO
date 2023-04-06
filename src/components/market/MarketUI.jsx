import React, {useContext, useEffect, useState} from "react";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import Table from "../table/Table.jsx";
import {MainCtx} from "../../contexts/MainContext";
import apiService from '../../api/index'
import Details from "../Details";
import {v4} from "uuid";
import {yupResolver} from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import {useForm, useFieldArray} from 'react-hook-form'
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

export const JsSchema = Yup.object().shape({
    products: Yup.array().of(Yup.object().shape({
        product_id: Yup.string().required('Value is mendatory'), quantity: Yup.number().required('Value is mendatory'),
    }),),
})

function MarketUI() {
    const navigate = useNavigate();
    const {market, setMarket, setShowModal, clients, setClients} = useContext(MainCtx);
    const [prodCount, setProdCount] = useState(1);
    const [productsList, setProductsList] = useState([]);

    const optionsDf = {resolver: yupResolver(JsSchema)}

    const {
        control, formState: {errors}, handleSubmit, register, watch,
    } = useForm(optionsDf)

    const {fields, append, remove} = useFieldArray({name: 'products', control})
    const ProdList = watch('ProdList');

    useEffect(() => {
        const currentProp = parseInt(prodCount || 0)
        const previousProp = fields.length
        if (currentProp > previousProp) {
            for (let i = previousProp; i < currentProp; i++) {
                append({product_id: undefined, quantity: null})
            }
        } else {
            if (currentProp !== 1 || currentProp !== 0) {
                for (let i = previousProp; i > currentProp; i--) {
                    remove(i - 1)
                }
            }
        }
    }, [ProdList, prodCount])

    useEffect(() => {
        apiService('get', '/client/all').then(res => setClients(res.data.clients))
        apiService('get', '/product/all').then(res => {
            setProductsList(res.data.pruduct)
        })
    }, [])

    const handleDelete = (id) => {
        apiService("delete", `market/${id}`).then(res => {
            setMarket(market.filter(d => d._id !== id));
            return true;
        });
    }

    let marketForm = [{ title: 'Garov puli', id: 'bail_payment', type: 'number' }, {
        title: 'Miqdor',
        id: 'quantity',
        type: 'number'
    },]

    const showDetails = (id) => {
        navigate(`/market/${id}`)
    }

    const onSubmit = (data) => {
        let req = {
            client_id: data.client_id,
            bail_payment: +data.bail_payment,
            products: data.products
        }

        apiService('post', '/market/create', req).then(res => {
            setMarket([...market, res.data.market]);
            toast('Created', { type: "success" });
            console.log(market)
            setShowModal(false);
        })
    }

    const plusInputs = () => {
        setProdCount(prodCount + 1);
    }

    const minusInputs = () => {
        if (productsList.length !== 1) {
            setProdCount(prodCount - 1);
        }
    }

    return (
        <>
            <div className="h-screen">
                <div className={"max-w-7xl mx-auto px-4  sm:pt-10 sm:px-6 lg:px-8"}>
                    <div className="py-5 flex justify-end">
                        <Button onClick={() => setShowModal(true)} children="Buyurtma berish" classes="max-sm:hidden block" />
                        <Button onClick={() => setShowModal(true)} classes="max-sm:block hidden">+</Button>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-full max-w-full max-sm:overflow-scroll">
                            <Table tb_data={market} th_data={[
                                { name: 'Garov puli', key: 'bail_payment', func: () => false },
                                { name: 'Umumiy summa', key: 'total_sum', func: () => false },
                                { name: 'Qolgan summa', key: 'remaining_money', func: () => false },
                                { name: 'Holati', key: 'status', func: () => false },
                                { name: 'Tomonidan', key: 'creator_type', func: () => false },
                                { name: 'Kiritilgan vaqt', key: 'createdAt', func: () => false },
                                { name: 'Yangilangan vaqt', key: 'updatedAt', func: () => false },
                                { name: 'Amallar', key: 'status', func: () => true },
                            ]} action1={handleDelete} showDetails={showDetails} />
                        </div>
                    </div>
                </div>
            </div>
            <Modal headerContext={"Buyurtma berish"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="hidden"
                        name="ProdList"
                        value={prodCount}
                        onInput={(e) => setProdCount(e.target.value)}
                        {...register('ProdList')}
                    />
                    <div key={v4()} className={"mb-3"}>
                        <label
                            htmlFor={'client'}
                            className="labelClass">
                           Mijoz
                        </label>
                        <select
                            {...register('client_id')}
                            className="formInput text-black pl-1 mt-1"
                            id="client"
                        >
                            {clients.map(client => <option key={client._id} value={client._id}>{client.name}</option>)}
                        </select>
                        <div className="invalid-feedback">
                            {errors.product?.client_id?.message}
                        </div>
                    </div>
                    <div key={v4()} className="mb-3">
                        <label
                            htmlFor='bail_payment'
                            className="labelClass">
                            Garov puli
                        </label>
                        <input
                            type="number"
                            {...register('bail_payment')}
                            name="bail_payment"
                            className="formInput"
                            placeholder="000000"
                        />
                        <div className="invalid-feedback">
                            {errors.products?.bail_payment?.message}
                        </div>
                    </div>
                    {fields.map((item, i) => (<div key={i} className="mt-3 mb-2 flex">
                        <div className="w-full flex items-end gap-5">
                            <div className="w-full">
                                <label>Mahsulot</label>
                                <select id="product_id"
                                    placeholder="Select one"
                                    name={`products[${i}]product_id`}
                                    {...register(`products.${i}.product_id`)}
                                    className={`formInput ${errors.products?.[i]?.product_id ? 'is-invalid' : ''}`}
                                >
                                    {productsList?.map(prod => {
                                        return prod.quantity >= 1 && (
                                            <option value={prod._id} key={prod._id}>{prod.name}</option>)
                                    })}
                                </select>
                                <div className="invalid-feedback">
                                    {errors.products?.[i]?.product_id?.message}
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="">Miqdor</label>
                                <input
                                    name={`products[${i}]quantity`}
                                    {...register(`products.${i}.quantity`)}
                                    className={`formInput ${errors.products?.[i]?.quantity ? 'is-invalid' : ''}`}
                                    type="text"
                                />
                                <div className="invalid-feedback">
                                    {errors.products?.[i]?.quantity?.message}
                                </div>
                            </div>
                        </div>
                        {(fields.length - 1 === i) &&
                            <div
                                key={v4()}
                                className="mb-1 items-end justify-center flex w-[20%]">
                                <button
                                    onClick={plusInputs}
                                    type="button"
                                    className="w-7 h-7 mb-2 bg-amber-400 text-white rounded w-full">+</button>
                                {fields.length !== 1 && <button onClick={minusInputs}
                                                                type="button"
                                                                className="w-7 h-7 mb-2 bg-red-400 text-white rounded w-full">-</button>}
                            </div>}
                    </div>))}
                    <div className="my-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-indigo-700 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
                            Jo'natish
                        </button>
                    </div>
                </form>
            </Modal>
            <Details form={marketForm}/>
        </>
    );
}

export default MarketUI;
