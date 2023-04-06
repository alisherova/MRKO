import React, {useState} from 'react'

export const MainCtx = React.createContext({});

const MainContext = ({children}) => {
    const [userDetails, setUserDetails] = useState({});
    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [loads, setLoads] = useState([]);
    const [details, setDetails] = useState([]);
    const [market, setMarket] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [isDetailed, setIsDetailed] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setEditModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [location, setLocation] = useState(window.location.href.split('/'));

    return (
        <MainCtx.Provider value={{
            userDetails,
            showEditModal,
            setEditModal,
            setMarket,
            market,
            setUserDetails,
            clients,
            setClients,
            employees,
            setEmployees,
            showModal,
            setShowModal,
            loads,
            setLoads,
            products,
            setProducts,
            location,
            setLocation,
            details,
            setDetails,
            isDetailed,
            setIsDetailed,
            isEditing,
            setIsEditing,
        }}>
            {children}
        </MainCtx.Provider>
    )

}


export default MainContext;