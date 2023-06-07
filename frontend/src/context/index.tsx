import { createContext, useReducer } from "react";
import { getToken, removeToken, setToken } from "../utils";

const initialState = {
    token: getToken(),
    modal:{
        msg:"",
        func:null
    }
};

const Context = createContext<any>(null);

const reducer = (state:any, action:any) => {
    switch (action.type) {
        case "addToken":
            setToken(action.token);
            return {
                ...state,
                token: action.token,
            };
        case "removeToken":
            removeToken();
            return {
                initialState
            };
        case "showModal":
            return{
                ...state,
                modal: {...action.modal}
            };
        default:
            return state;
    }
};

function MyContext({children}:{children:React.ReactNode}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    );
}
export default MyContext;
export { MyContext, Context };