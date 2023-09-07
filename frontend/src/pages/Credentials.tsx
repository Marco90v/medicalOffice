import { SubmitHandler, useForm } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
// import { credential, specialist } from "../types";

import editIcon from "../assets/edit-alt-solid-24.png";
import removeIcon from "../assets/trash-alt-solid-24.png";

import { useContext, useState } from "react";
import InputPassword from "../components/InputPassword";
import { FiledRequired } from "../components";
import { Context } from "../context";
import { BASE_URL } from "../utils";

const initicalStateFormNew = {
    _id:"0",
    user: "",
    password: "",
    rePassword: "",
    _idUser: ""
};

interface login {
    _id:string,
    user:string,
    _idUser:string
}

type item = "user" | "password" | "rePassword" | "_idUser";

function Credentials() {
    const { dispatch } = useContext(Context);

    const { register, handleSubmit, reset, setValue,  formState: { errors } } = useForm<credential>({defaultValues:initicalStateFormNew});
    const { state:specialists } = useFetch<specialist[]>(BASE_URL, "specialist");
    const { state:logins, updateFetch, setFetch, deleteFetch } = useFetch<login[]>(BASE_URL, "login");
    const [edit, setEdit] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const onSubmit:SubmitHandler<credential>  = (data:any) => {        
        if(data.password === data.rePassword){
            setError(undefined);
            if(edit){
                updateFetch('login', data, ()=>reset());
            }else{
                setFetch('newLogin', data, ()=>reset());
            }
        }else{
            setError("Password does not match");
        }
    };

    const callBackRemoveOk = () => {
        const modal = { msg:"", func:null };
        dispatch({ type:"showModal", modal });
        reset();
    };

    const callBackRemove = (id:string) => {
        const _id:any = {_id:id};
        deleteFetch("login", _id, callBackRemoveOk);
    };

    const remove = (item:login) => {
        const msg = <>Do you want to remove <span className="underline text-red-600 italic">{item.user}</span>?</>;
        const modal = {
            msg,
            func: ()=>callBackRemove(item._id),
            error: ""
        };
        dispatch({ type:"showModal", modal });
    };


    const setForm = (item:login) => {
        // console.log(item);
        setEdit(true);
        Object.entries(item).map( ([key, value]) => setValue( key as item, value) );
    };

    const cancel = () => {
        reset();
        setEdit(false);
        setError(undefined);
    };

    return(
        <>
            <form className="bg-gray-200 p-2 grid grid-cols-2 gap-4 items-center rounded-md max-w-screen-md m-auto"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div>
                    <label className="font-black" htmlFor="user">User</label>
                    <input className="p-1 rounded-md w-full" type="text" id="user"
                        { ...register("user", {required:true}) }
                    />
                    { errors.user && <FiledRequired text="Missing user name" /> }
                </div>

                <div>
                    <label className="font-black" htmlFor="password">Password</label>
                    <InputPassword register={register} name="password" />
                    { errors.password && <FiledRequired text="Missing password" /> }
                </div>

                <div>
                    <label className="font-black" htmlFor="rePassword">Re-Password</label>
                    <InputPassword register={register} name="rePassword" />
                    { errors.rePassword && <FiledRequired text="No password repeat" /> }
                </div>

                <div>
                    <label className="font-black" htmlFor="_idUser">Person</label>
                    <select className="p-1 bg-white rounded-md w-full" id="_idUser"
                        { ...register("_idUser", {required:true}) }
                    >
                        <option value=""></option>
                        <option value="0">Admin</option>
                        {
                            specialists?.map(item=>{
                                return <option key={item._id} value={item._id}>{`${item.name} ${item.lastName} - ${item.specialtyName}`}</option>;
                            })
                        }
                    </select>
                    { errors._idUser && <FiledRequired text="Person to be added" /> }
                </div>
                {
                    edit ?
                    <>
                        <button type="submit"
                            className="btn font-black bg-yellow-500 p-1 rounded-md hover:bg-yellow-400"
                        >Edit</button> 
                        <button type="button"
                            className="btn font-black bg-red-600 p-1 rounded-md hover:bg-red-500"
                            onClick={cancel}
                        >Cancel</button>
                    </>:
                    <button type="submit"
                        className="btn font-black bg-green-500 p-1 rounded-md hover:bg-green-400"
                    >New</button>
                }
                { error && <FiledRequired text={error ? error : ""} /> }
            </form>
            {/* Lista de usuarios */}
            <table
                className="m-auto mt-6 max-w-lg w-[40rem]"
            >
                <thead>
                    <tr className="bg-black text-white font-black">
                        <td className="py-2 px-4">User</td>
                        <td className="py-2 px-4 text-center">Edit</td>
                        <td className="py-2 px-4 text-center">Remove</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        logins?.map(item=>{
                            return(
                                <tr key={item._id}
                                    className="border-x-2 odd:bg-white even:bg-slate-100 last:border-b-2 hover:bg-slate-200"
                                >
                                    <td className="py-2 px-1 pl-2 text-left">{item.user}</td>
                                    <td className="py-2 px-1 text-center">
                                        <img
                                            className="btn-table bg-yellow-400 hover:bg-yellow-300"
                                            src={editIcon}
                                            alt="edit"
                                            onClick={()=>setForm(item)}
                                        />
                                    </td>
                                    <td className="py-2 px-1 text-center">
                                        <img
                                            className="btn-table bg-red-600 hover:bg-red-500"
                                            src={removeIcon}
                                            alt="remove"
                                            onClick={()=>remove(item)}
                                        />
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </>
    );
}

export default Credentials;
export { Credentials };