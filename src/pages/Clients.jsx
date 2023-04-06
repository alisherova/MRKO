import React, {useContext, useEffect} from 'react';
import ClientsTableUI from "../components/clients/ClientsTableUI";
import apiService from "../api/index.js";
import { MainCtx } from '../contexts/MainContext';

function Clients() {
    const {setClients} = useContext(MainCtx);
    
    useEffect(() => {
        apiService("get", "client/all").then(res => { 
            setClients(res.data.clients);
        })
    }, []);

    return (
        <div>
            <ClientsTableUI/>
        </div>
    );
}

export default Clients;