import { useCallback, useContext, useEffect, useState } from "react";
import { Context } from "../context";
interface error {
    error:string,
}
interface _id{
    _id:string
}

type func = () => void;
interface errors {
    getError:error | undefined,
    setError:error | undefined,
    updateError:error | undefined,
    removeError:error | undefined,
}
interface returnFunc<T> {
    state: T | undefined,
    getFetch: (path: string, callBackOk?:func, callBackError?:func) => void,
    setFetch: (path: string, body:T, callBackOk?:func, callBackError?:func) => void,
    updateFetch: (path: string, body:T, callBackOk?:func, callBackError?:func) => void,
    deleteFetch: (path: string, body:T, callBackOk?:func, callBackError?:func) => void,
    error:errors
}

export function useFetch<T>(baseURL:string, PATH?:string):returnFunc<T> {

    const { state: { token } } = useContext(Context);
    const [state, setState] = useState<T | undefined>(undefined);
    const [getError, setErrorGet] = useState<error | undefined>(undefined);
    const [setError, setErrorSet] = useState<error | undefined>(undefined);
    const [updateError, setErrorUpdate] = useState<error | undefined>(undefined);
    const [removeError, setErrorRemove] = useState<error | undefined>(undefined);

    const resetErrors = () => {
        setErrorGet(undefined);
        setErrorSet(undefined);
        setErrorUpdate(undefined);
        setErrorRemove(undefined);
    };

    const action = useCallback( async (url:string, method:string, body?:T):Promise<Response | error> => {
        resetErrors();
        const res:Response | error = await fetch(url, {
                method,
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                mode: 'cors',
                cache:"no-cache"
            })
            .catch( error => {
                console.log(error);
                return {error:"Failed to fetch"};
            });
        return res;
    },[token]);

    const getFetch = useCallback( (path:string, callBackOk?:func, callBackError?:func) => {
        action(baseURL+path, "GET")
        .then( async (res) => {
            const data = (res as error).error || await (res as Response).json();
            if((res as Response).ok) {
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
    

    const setFetch = (path:string, body:T, callBackOk?:func, callBackError?:func) => {
        action(baseURL+path, "POST", body)
        .then( async (res) => {
            const data = (res as error).error || await (res as Response).json();
            if((res as Response).ok) {
                setState( (items) => {
                    if(items){
                        if(Array.isArray(items)){
                            return [...items, data];
                        }else{
                            return data;
                        }
                    }else{
                        return data;
                    }
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

    const updateFetch = (path:string, body:T, callBackOk?:func, callBackError?:func) => {
        action(baseURL+path, "PUT", body)
        .then( async (res) => {
            const data = (res as error).error || await (res as Response).json();
            if((res as Response).ok) {
                setState( (items) => {
                    if(Array.isArray(items)){
                        return items?.map( (item) => (item as _id)._id===data._id ? data : item);
                    }else{
                        return data;
                    }
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

    const deleteFetch = (path:string, body:T, callBackOk?:func, callBackError?:func) => {
        action(baseURL+path, "DELETE", body)
        .then( async (res) => {
            const data = (res as error).error || await (res as Response).json();
            if((res as Response).ok) {
                setState( ( items ) => {
                    if(Array.isArray(items)){
                        return items?.filter( (item:T) => (item as _id)._id !== data._id ) as T;
                    }else{
                        return undefined;
                    }
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

    const error = { getError, setError, updateError, removeError };
    return { state, getFetch, setFetch, updateFetch, deleteFetch, error };
}