import React, { useContext,useState, useEffect } from "react"; 
import { useParams } from "react-router-dom";
import {v4} from "uuid"; 
import apiService from "../../api";
import { MainCtx } from "../../contexts/MainContext";
import moment from "moment";
import ClientImg from "../../assets/patient.png" 

function ClientsDetails() {
    const {id} = useParams()
    const { details, setDetails } = useContext(MainCtx);
    const [tableProducts, setTableProducts] = useState([])

    useEffect(() => {
        apiService("get", `client/${id}`).then(res => { 
            setDetails(res.data.client);    
        })
        apiService("get", `/market/all?client_id=${id}`).then(res => {
            setTableProducts(res.data.market)
        })
    }, [id])

    return (
        <div className="h-screen">
            <div className={"max-w-7xl mx-auto px-4  sm:pt-10 sm:px-6 lg:px-8"}> 
                <div className="flex justify-center">
                    <div className="w-full max-w-full flex items-start justify-between gap-12 max-sm:overflow-scroll">
                        <div className="bg-white border rounded-md w-1/5 py-3 px-4">
                            <div className="w-4/6 m-auto">
                                <img src={ClientImg} alt="ClientImg" />
                            </div>
                                <div className="text-black border-t-2 space-y-1 mt-3 pt-2">
                                    <p><span className="font-semibold">Ism: </span>{details.name}</p>
                                    <p><span className="font-semibold">Telefon: </span>{details.phone_number}</p>
                                    <p><span className="font-semibold">Manzil: </span>{details.address}</p>
                                    <p><span className="font-semibold">Status: </span>{details.status}</p>
                                </div>
                        </div>
                        <table className={"border border-slate-500 dark:border-white w-4/5"}>
                            <thead className={"thead"}>
                                <tr>
                                    <th className="td">Garov puli</th>
                                    <th className="td">Umumiy summa</th>
                                    <th className="td">Qolgan summa</th> 
                                    <th className="td">Bonus</th>
                                    <th className="td">Kiritilgan vaqt</th>
                                    <th className="td">Yangilangan vaqt</th>
                                    <th className="td">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableProducts.map(product => {
                                    return(
                                        <tr className='' key={v4()}>
                                        <td className={"td"} key={v4()}>{product.bail_payment}</td> 
                                        <td className={"td"} key={v4()}>{product.total_sum}</td> 
                                        <td className={"td"} key={v4()}>{product.remaining_money}</td> 
                                        <td className={"td"} key={v4()}>{product.bonus}</td> 
                                        <td className={"td"} key={v4()}>{moment(product.createdAt).format("DD-MM-YYYY")}</td> 
                                        <td className={"td"} key={v4()}>{moment(product.updatedAt).format("DD-MM-YYYY")}</td> 
                                        <td className={"td"} key={v4()}>{product.status}</td> 
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientsDetails;
