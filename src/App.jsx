import {Route, Routes, useLocation} from "react-router-dom";
import "./App.css";
import DisLogIn from "./components/DistributerLogIn";
import MemberLogin from "./components/MemberLogin";
import RoleSelector from "./components/RoleSelector";
import Home from "./pages/Home.jsx";
import IdentificationPage from "./pages/IdentificationPage";
import Loads from "./pages/Loads.jsx";
import Clients from "./pages/Clients.jsx";
import Products from "./pages/Products.jsx";
import Navbar from "./components/Navbar.jsx";
import React, {useContext, useEffect} from "react";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {MainCtx} from "./contexts/MainContext.jsx";
import Details from "./components/Details";
import ClientsDetails from "./components/clients/ClientDetails";
import Employee from "./pages/Employee";
import Market from "./pages/Market";
import OrderDetails from "./components/market/OrderDetails";
import LoadDetails from "./components/loads/LoadDetails";
function App() {
    const located = useLocation();
    const {setUserDetails, location, setLocation} = useContext(MainCtx);

    useEffect(() => {
        let variable = JSON.parse(localStorage.getItem('user'));
        let variable2 = JSON.parse(localStorage.getItem('company'));
        setUserDetails(variable ? variable : variable2);
        setLocation(window.location.href.split('/'));
    }, [located]);

    return (
        <>
            <ToastContainer/>
            {location.includes('login') ? "" : <Navbar/>}
            <Routes>
                <Route path='login' element={<IdentificationPage/>}>
                    <Route index element={<RoleSelector/>}/>
                    <Route path='companyLogIn' element={<DisLogIn/>}/>
                    <Route path='memberLogIn' element={<MemberLogin/>}/>
                </Route>
                <>
                    <Route path='/clients/:id' element={<ClientsDetails/>}/>
                    <Route path='/' element={<Market/>}/>
                    <Route path='/loads' element={<Loads/>}/>
                    <Route path='/clients' element={<Clients/>}/>
                    <Route path='/products' element={<Products/>}/>
                    <Route path='/details' element={<Details/>}/>
                    <Route path='/employee' element={<Employee/>}/>
                    <Route path='/market' element={<Market/>}/>
                    <Route path='/market/:id' element={<OrderDetails/>}/>
                    <Route path='/load/:id' element={<LoadDetails/>}/>
                </>
            </Routes>
        </>
    );
}

export default App;
