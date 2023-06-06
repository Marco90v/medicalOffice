import { createContext, useReducer } from "react";
import { getToken, removeToken, setToken } from "../utils";

const initialState = {
    token: getToken(),
    specialty:[]
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