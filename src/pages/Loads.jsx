import React, {useContext, useEffect} from 'react';
import LoadsTableUi from "../components/loads/LoadsTable";
import { MainCtx } from '../contexts/MainContext';
import apiService from "../api/index.js";

function Loads() {
    const {setLoads} = useContext(MainCtx);

    useEffect(() => {
        apiService("get", "load/all").then(res => {
            setLoads(res.data.loads);
        })
    }, []);

    return (
        <div>
            <LoadsTableUi />
        </div>
    );
}

export default Loads;