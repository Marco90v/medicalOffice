// import { useContext } from "react";
// import { Context } from "../context";
import { IFormInput } from "../type";

export function setToken(token:string) {
    localStorage.setItem("token",token);
}
export function getToken() {
    return localStorage.getItem("token") || undefined;
}
export function removeToken() {
    localStorage.removeItem("token");
}
export const initicalStateFormNew:IFormInput = {
    fullName: "",
    fullSurname: "",
    identityNumber: "",
    gender: "",
    email: "",
    phone: 0,
    specialty:"",
    specialist: "",
    alcohol: "",
    canavis: "",
    cocaine: "",
    smoke: "",
    background:[
        // {details:"details", relationship:"relationship"}
    ]
};

// export const useFetch = async (path:string, method:string="GET", body?:any) => {
//     const { state:{token} } = useContext(Context);

//     const res = await fetch(`http://localhost:3000/api/v1/${path}`, {
//         method,
//         body:JSON.stringify(body),
//         headers:{
//             "Content-Type": "application/json",
//             "Authentication": `Bearer ${token}`,
//         },
//         mode: 'cors',
//     });
//     return res;
// }