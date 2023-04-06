import axios from "axios";
import {toast} from "react-toastify";

export const baseUrl = import.meta.env.VITE_BASE_URL;

export default async function apiService(reqType, apiRoute, data = {}) {
    const instance = axios.create({
        baseURL: `${baseUrl}`,
        headers: {
            "Content-type": apiRoute.includes("/upload")
                ? "multipart/form-data"
                : "application/json",
            Authorization: `${localStorage.getItem("token")}`,
        },
    });

    let dataAr;
    switch (reqType) {
        case "get":
            await instance
                .get(apiRoute, {params: data})
                .then((response) => {
                    dataAr = response.data;
                })
                .catch((err) => {
                    console.log(err);
                    toast(err.message, {type: "error"});
                    // window.localStorage.removeItem('token');
                    // window.open('/login', '_self');
                });
            break;
        case "post":
            await instance
                .post(apiRoute, data)
                .then((response) => {
                    dataAr = response.data;
                })
                .catch((err) => {
                    console.log(err.response);
                    if (err.response?.data?.message) {
                        toast(err.response?.data?.message, {type: "error"});
                    }
                    toast(err.response.data.error, {type: "error"});
                    // window.localStorage.removeItem('token');
                    // window.open('/login', '_self');
                });
            break;
        case "patch":
            await instance
                .patch(apiRoute, data)
                .then((response) => {
                    dataAr = response.data;
                })
                .catch((err) => {
                    console.log(err);
                    toast(err.message, {type: "error"});
                    // window.localStorage.removeItem('token');
                    // window.open('/login', '_self');
                });
            break;
        case "delete":
            await instance
                .delete(apiRoute)
                .then((response) => {
                    dataAr = response?.data;
                })
                .catch((err) => {
                    console.log(err);
                    toast(err.message, {type: "error"});
                    // window.localStorage.removeItem('token');
                    // window.open('/login', '_self');
                });
            break;
        default:
            toast("Unknown request type", {type: "error"});
            break;
    }
    return dataAr;
}