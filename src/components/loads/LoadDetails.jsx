import React, {useContext, useEffect, useState} from 'react'
import apiService from '../../api';
import {MainCtx} from '../../contexts/MainContext'
import {useParams} from 'react-router-dom';
import moment from "moment";

function LoadDetails() {
    const {id} = useParams()
    const {details, setDetails} = useContext(MainCtx);
    const [loadProducts, setLoadProducts] = useState([]);

    useEffect(() => {
        apiService("get", `load/${id}`).then((res) => {
            let loadRes = res.data.load
            setDetails(loadRes)
            setLoadProducts(details.products)
        })
    }, [id]);

    return (
        <div className="h-screen">
            <div className={"max-w-7xl mx-auto px-4  sm:pt-10 sm:px-6 lg:px-8"}>
                <div className="flex flex-wrap justify-center items-center  md:justify-between mb-5 ">
                    <div className="Cards">
                        <div className="CardsBody">
                            <p className="CardsTitle">Sof xarajat:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.net_cost}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Raqamlash.m:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.number_machines}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Garov puli:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.bail_payment}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Arralash xizmati:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.sawmill_service}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Tashuvchilik xizmati:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.carrier_service}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Umumiy xarajatlar:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.total_expense}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Umumiy summa:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.total_sum}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Foyda:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.benefit}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Foiz:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.persentage}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Kiritilgan vaqt:</p>
                            <span
                                className="text-violet-600 dark:text-gray-300">{moment(details.createdAt).format('DD-MM-YYYY')}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Yangilangan vaqt:</p>
                            <span
                                className="text-violet-600 dark:text-gray-300">{moment(details.updatedAt).format("DD-MM-YYYY")}</span>
                        </div>
                        <div></div>
                    </div>
                    <div className="Cards">
                        <div className="CardsBody ">
                            <p className="CardsTitle">Ism:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.client_name}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Manzil:</p>
                            <span
                                className="text-violet-600 dark:text-gray-300  text-right pl-5">{details.address}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Telefon raqam:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.client_phone_number}</span>
                        </div>
                        <div className="CardsBody">
                            <p className="CardsTitle">Status:</p>
                            <span className="text-violet-600 dark:text-gray-300">{details.status === 'taken' ? 'olingan' : ''}</span>
                        </div>

                        <div></div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-full max-w-full max-sm:overflow-scroll">
                        <table className={"table"}>
                            <thead className={"thead"}>
                            <tr>
                                <th className="td">Nomi</th>
                                <th className="td">Turi</th>
                                <th className="td">Miqdori</th>
                                <th className="td">So'm</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                loadProducts?.map(product => {
                                    return (
                                        <tr className="dark:hover:bg-indigo-500 hover:bg-slate-300" key={v4()}>
                                            <td className="td">{product.name}</td>
                                            <td className="td">{product.type}</td>
                                            <td className="td"> {product.quantity}</td>
                                            <td className="td"> {product.sum}</td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default LoadDetails