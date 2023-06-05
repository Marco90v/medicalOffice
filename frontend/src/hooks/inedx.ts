import { useContext, useEffect, useState } from "react";
import { Context } from "../context";
// import { error, specialty } from "../type";

export const useFetch = (path:string, method="GET", body?:any) => {
    const { state:{token} } = useContext(Context);
    const [state, setState] = useState(undefined);

    useEffect( () => {
        fetch(`http://localhost:3000/api/v1/${path}`, {
            method,
            body:JSON.stringify(body),
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            mode: 'cors',
        })
        .then( res => res.json() )
        .then( res => setState(res) );
        // setState(res);
    }, [body, method, path, token]);

    return [state];
};