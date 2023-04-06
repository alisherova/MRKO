import React, {useContext, useState} from 'react'
import {PatternFormat} from 'react-number-format';
import {BsEye, BsEyeSlash} from "react-icons/all";
import apiService from "../api/index.js";
import {toast} from "react-toastify";
import {useLocation, useNavigate} from "react-router-dom";
import {MainCtx} from "../contexts/MainContext.jsx";

function Login({title}) {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const {setUserDetails} = useContext(MainCtx);
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState({
        phone_number: "",
        password: ""
    });

    const handleLogin = (e) => {
        e.preventDefault();
        let realVal = data.phone_number.split(' ').join('');
        realVal = realVal.split('(').join('');
        realVal = realVal.split(')').join('');
        realVal = +realVal.split('+').join('');
        let jsonData = {
            ...data,
            phone_number: realVal
        }
        apiService('post', pathname === '/login/companyLogIn' ? 'company/login' : 'employee/login', jsonData).then(res => {
            if (res.success) {
                let data = res.data?.company ? res.data?.company : res.data?.employee;
                localStorage.setItem(res.data?.company ? "company" : "user", JSON.stringify(data));
                setUserDetails(res.data?.company ? res.data?.company : res.data?.employee);
                toast("Login success", {type: "success"});
            }
            navigate('/')
            localStorage.setItem("token", res.data.token);
        })
    }

    return (
        <form onSubmit={handleLogin}
              className="flex flex-col bg-slate-100 text-black justify-center items-center md:w-6/12 w-full tabletLogIn">
            <h1 className="text-4xl font-semibold mb-8">{title}</h1>
            <div className='flex flex-col md:w-6/12 w-9/12 gap-1 mb-4'>
                <PatternFormat
                    onChange={(e) => {
                        setData({...data, phone_number: e.target.value});
                    }}
                    value={data.phone_number}
                    className='loginInput'
                    format="+998 (##) ### ## ##"
                    allowEmptyFormatting
                    mask="_"
                />
                <div className={"relative"}>
                    <input
                        className='loginInput'
                        value={data.password}
                        onInput={(e) => setData({...data, password: e.target.value})}
                        type={visible ? "text" : "password"}
                        placeholder='Password'
                    />
                    <div onClick={() => setVisible(!visible)} className={"visibility"}>{!visible ? <BsEye/> :
                        <BsEyeSlash/>}</div>
                </div>
            </div>
            <input className='bg-blue-600 md:w-6/12 w-9/12 loginBtn mb-2 text-white' type="submit" value='Submit'/>
        </form>
    )
}

export default Login