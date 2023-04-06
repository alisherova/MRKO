import React, {useContext} from 'react'
import {useEffect} from 'react';
import apiService from '../api/index.js';
import EmployeeTableUI from '../components/EmployeeTableUI'
import {MainCtx} from '../contexts/MainContext';

function Employee() {
    const {setEmployees} = useContext(MainCtx)

    useEffect(() => {
        apiService("get", "employee/all").then(res => {
            setEmployees(res.data.employee)
        })
    }, []);

    return (

        <div>
            <EmployeeTableUI/>
        </div>
    )
}


export default Employee