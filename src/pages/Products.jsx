import React, {useContext, useEffect} from 'react';
import ProductsTableUI from "../components/ProductsTableUI";
import apiService from "../api/index.js";
import { MainCtx } from '../contexts/MainContext';

function Products() {
    const {setProducts} = useContext(MainCtx);
    
    useEffect(() => {
        apiService("get", "product/all").then(res => { 
            setProducts(res.data.pruduct); 
        })
    }, []); 
    return (
        <div>
            <ProductsTableUI/>
        </div>
    );
}

export default Products;