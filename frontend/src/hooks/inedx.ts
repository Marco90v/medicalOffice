import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../context";
// import { error, specialty } from "../type";

export const useFetch = (path?:string, method="GET", body?:any):[any, (path: string, method?: string, body?: any) => void] => {
    const { state:{token} } = useContext(Context);
    const [state, setState] = useState(undefined);

    const action = useCallback( (path:string, method="GET", body?:any) => {
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
    }, [token]);

    useEffect( () => {
        // path && fetch(`http://localhost:3000/api/v1/${path}`, {
        //     method,
        //     body:JSON.stringify(body),
        //     headers:{
        //         "Content-Type": "application/json",
        //         "Authorization": `Bearer ${token}`,
        //     },
        //     mode: 'cors',
        // })
        // .then( res => res.json() )
        // .then( res => setState(res) );
        path && action(path, method, body);
    }, [path, method, body, token, action]);

    // const action = (path:string, method="GET", body?:any) => {
    //     fetch(`http://localhost:3000/api/v1/${path}`, {
    //         method,
    //         body:JSON.stringify(body),
    //         headers:{
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`,
    //         },
    //         mode: 'cors',
    //     })
    //     .then( res => res.json() )
    //     .then( res => setState(res) );
    // };


    return [state, action];
};