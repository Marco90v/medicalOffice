// import { useContext } from "react";
// import { Context } from "../context";
// import { useFetch } from "../hooks/inedx";
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
