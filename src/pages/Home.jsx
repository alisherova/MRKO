import React, {useEffect} from "react";
import Navbar from "../components/Navbar.jsx";
import TableUi from "../components/TableUI";
import {useNavigate} from "react-router-dom";

function Home(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('login')
        }
    }, []);

    return (
        <div>
            <div>
                <TableUi/>
            </div>
        </div>
    );
}

export default Home;
