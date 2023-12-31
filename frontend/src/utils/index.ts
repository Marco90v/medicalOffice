// import { useContext } from "react";
// import { Context } from "../context";
// import { useFetch } from "../hooks/inedx";
// import { medicalHistory } from "../types";

export const BASE_URL = "http://localhost:3000/api/v1/";

export function setToken(token: string) {
    localStorage.setItem("token", token);
}
export function getToken() {
    return localStorage.getItem("token") || undefined;
}
export function removeToken() {
    localStorage.removeItem("token");
}
export const initicalStateFormNew: medicalHistory = {
    fullName: "",
    fullSurname: "",
    dni: "",
    gender: "",
    email: "",
    phone: "",
    specialty: "",
    specialist: "",
    alcohol: "",
    canavis: "",
    cocaine: "",
    smoke: "",
    background: [
        // {details:"details", relationship:"relationship"}
    ],
    attention: [],
};

export const StyleCSS = {
    itemsStart: "items-start",
};
