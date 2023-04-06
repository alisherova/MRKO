import React, {useContext, useEffect} from "react";
import {useParams} from "react-router-dom";
import apiService from "../api";
import {MainCtx} from "../contexts/MainContext";
import Table from "../components/table/Table.jsx";

function OrderDetailedPage() {
    const {id} = useParams();
    const {details, setDetails, market} = useContext(MainCtx);

    useEffect(() => {
        apiService("get", `market/${id}`).then((res) => {
            setDetails(res.data.market);
        });
    }, [id]);

    return (
        <div className="h-screen">
            <div className={"max-w-7xl mx-auto px-4  sm:pt-10 sm:px-6 lg:px-8"}>
                <div className="flex justify-center">
                    <div className="w-full max-w-full max-sm:overflow-scroll">
                        <Table tb_data={market} th_data={[
                            {name: 'Bail Payment', key: 'bail_payment', func: () => false},
                            {name: 'Quantity', key: 'quantity', func: () => false},
                            {name: 'Total Sum', key: 'total_sum', func: () => false},
                            {name: 'Remaining Money', key: 'remaining_money', func: () => false},
                            {name: 'Bonus', key: 'bonus', func: () => false},
                            {name: 'Status', key: 'status', func: () => false},
                            {name: 'Creator Type', key: 'creator_type', func: () => false},
                            {name: 'Created At', key: 'createdAt', func: () => false},
                            {name: 'Updated At', key: 'updatedAt', func: () => false},
                        ]}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetailedPage;
