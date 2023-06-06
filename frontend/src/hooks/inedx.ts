import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../context";
// import { error, specialty } from "../type";


export function useFetch(path?: string, method = "GET", body?: any): [any, (path: string, method?: string, body?: any) => void, any] {
    const { state: { token } } = useContext(Context);
    const [state, setState] = useState<any>(undefined);
    const [error, setError] = useState<any>(undefined);

    const action = useCallback((path: string, method = "GET", body?: any) => {
        fetch(`http://localhost:3000/api/v1/${path}`, {
            method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            mode: 'cors',
            cache:"no-cache"
        })
        .then(async (res) => {
            const data = await res.json();
            if (res.ok) {
                setState(data);
            } else {
                setError(data);
            }
        })
        .catch(error => {
            console.log(error);
            setError({error:"Failed to fetch"});
        });
    }, [token]);

    useEffect(() => {
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
    return [state, action, error];
}