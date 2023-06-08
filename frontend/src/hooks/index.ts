import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../context";

export function useFetch(baseURL:string, PATH?:string):any {

    const { state: { token } } = useContext(Context);
    const [state, setState] = useState<any>(undefined);
    const [getError, setErrorGet] = useState<any>(undefined);
    const [setError, setErrorSet] = useState<any>(undefined);
    const [updateError, setErrorUpdate] = useState<any>(undefined);
    const [removeError, setErrorRemove] = useState<any>(undefined);

    const action = useCallback( async (url:string, method:string, body?:any):Promise<any> => {
        const res = await fetch(url, {
                method,
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                mode: 'cors',
                cache:"no-cache"
            })
            .catch(error => {
                console.log(error);
                return {error:"Failed to fetch"};
            });
        return res;
    },[token]);

    const getFetch = useCallback( (path:string, method="GET", body?:any, callBackOk?:any, callBackError?:any) => {
        action(baseURL+path, method, body)
        .then( async (res:any) => {
            const data = await res.json();
            if(res.ok) {
                setState(data);
                callBackOk && callBackOk();
            } else {
                setErrorGet(data);
                callBackError && callBackError();
            }
        })
        .catch( (error)=>{
            console.log(error);
            setErrorGet({error:"Failed to fetch"});
            callBackError && callBackError();
        });
    }, [baseURL, action]);

    useEffect(() => {
        PATH && getFetch(PATH);
    }, [PATH, getFetch]);
    

    const setFetch = (path:string, body:any, callBackOk?:any, callBackError?:any) => {
        action(baseURL+path, "POST", body)
        .then( async (res) => {
            const data = await res.json();
            if(res.ok) {
                setState( (items:any) => {
                    if(items){
                        return [...items, data];
                    }
                    return undefined;
                });
                callBackOk && callBackOk();
            } else {
                setErrorSet(data);
                callBackError && callBackError();
            }
        })
        .catch( (error)=>{
            console.log(error);
            setErrorSet({error:"Failed to fetch"});
            callBackError && callBackError();
        });
    };

    const updateFetch = (path:string, body:any, callBackOk?:any, callBackError?:any) => {
        action(baseURL+path, "PUT", body)
        .then( async (res) => {
            const data = await res.json();
            if(res.ok) {
                setState( (items:any) => {
                    return items?.map((item:any) => item._id===data._id ? data : item);
                });
                callBackOk && callBackOk();
            } else {
                setErrorUpdate(data);
                callBackError && callBackError();
            }
        })
        .catch( (error)=>{
            console.log(error);
            setErrorUpdate({error:"Failed to fetch"});
            callBackError && callBackError();
        });
    };

    const deleteFetch = (path:string, body:any, callBackOk?:any, callBackError?:any) => {
        action(baseURL+path, "DELETE", body)
        .then( async (res) => {
            const data = await res.json();
            if(res.ok) {
                setState( (items:any) => {
                    return items?.filter((item:any) => item._id!==data._id);
                });
                callBackOk && callBackOk();
            } else {
                setErrorRemove(data);
                callBackError && callBackError();
            }
        })
        .catch( (error)=>{
            console.log(error);
            setErrorRemove({error:"Failed to fetch"});
            callBackError && callBackError();
        });
    };

    const error = { getError, setError, updateError, removeError};
    return {state, getFetch, setFetch, updateFetch, deleteFetch, error};
}