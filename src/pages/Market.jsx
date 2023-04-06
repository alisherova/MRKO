import React, {useEffect, useContext} from 'react'
import MarketUI from '../components/market/MarketUI.jsx';
import apiService from "../api/index.js";
import { MainCtx } from '../contexts/MainContext';

function Market() {
    const {setMarket} = useContext(MainCtx)

    useEffect(() => {
        apiService("get", "market/all").then(res => {
            console.log(res)
            setMarket(res.data.market);
        })
    }, []);

    return (
        <div>
            <MarketUI/>
        </div>
    );
}

export default Market