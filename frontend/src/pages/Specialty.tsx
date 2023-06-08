import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiledRequired, TableRowError, TableRowLoader } from "../components";
import { Context } from "../context";
import { useFetch } from "../hooks";
import { specialty } from "../type";

import editIcon from "../assets/edit-alt-solid-24.png";
import removeIcon from "../assets/trash-alt-solid-24.png";

const initialForm:specialty = {
    _id:"",
    name:"",
};

function Specialty() {
    const { dispatch } = useContext(Context);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<specialty>({defaultValues:initialForm});
    const [edit, setEdit] = useState(false);

    const {state:specialtys, setFetch, updateFetch, deleteFetch, error} = useFetch<specialty>("http://localhost:3000/api/v1/", "specialty");
    const {getError, setError, updateError, removeError} = error;
    // console.log(specialtys);

    useEffect(() => {
        const error = removeError ? removeError.error : removeError;
        dispatch({ type:"modalError", error });
    }, [removeError, dispatch]);

    const callBackUpdateFetch = () => {
        setEdit(false);
        reset();
    };

    const onSubmit:SubmitHandler<specialty> = async (data) => {
        if(edit){
            updateFetch("specialty", data, callBackUpdateFetch);
        }else{
            const specialty:specialty = {name:data.name};
            setFetch("specialty", specialty, reset);
        }
    };

    const setForm = (data:specialty) => {
        setValue("_id",data._id);
        setValue("name", data.name);
        setEdit(true);
    };

    const cancel = () => {
        reset();
        setEdit(false);
    };

    const callBackRemoveOk = () => {
        reset();
        const modal = { msg:"", func:null };
        dispatch({ type:"showModal", modal });
    };

    const callBackRemove = (_id?:string) => {
        deleteFetch("specialty", {_id}, callBackRemoveOk);
    };
    
    const remove = (item:specialty) => {
        const msg = <>Do you want to remove <span className="underline text-red-600 italic">{item.name}</span>?</>;
        const modal = {
            msg,
            func: ()=>callBackRemove(item._id),
            error: ""
        };
        dispatch({ type:"showModal", modal });
    };
    
    return(
        <div className="flex flex-col gap-10 pt-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="m-auto w-[30rem] grid grid-cols-5 gap-4 items-center"
            >
                <label htmlFor="name">Specialty</label>
                <input
                    className={`${edit ? "col-span-2" : "col-span-3"} border border-slate-300 p-1 rounded-md`}
                    type="text"
                    id="name"
                    {...register("name", {required:true} )}
                />
                {edit && <button className="bg-red-500 text-white p-1 rounded-md" type="button" onClick={cancel}>Cancel</button>}
                <button className="bg-green-500 text-white p-1 rounded-md" type="submit">{edit ? "Save": "Add"}</button>
                { errors.name &&  <FiledRequired text={"This field is required"} style={"col-span-4"} /> }
                { (setError || updateError) &&  <FiledRequired text={setError?.error || updateError?.error || ""} style={"col-span-4"} /> }
            </form>

            <table className="m-auto table-auto w-[30rem] border border-solid border-slate-500 rounded-md overflow-hidden">
                <thead className="bg-black text-white">
                    <tr>
                        <td className="py-2 px-4" >Specialty</td>
                        <td className="py-2 px-4 text-center" >Edit</td>
                        <td className="py-2 px-4 text-center" >Remove</td>
                    </tr>
                </thead>
                <tbody >
                    {
                        getError?.error ? <TableRowError error={getError.error} />
                        :
                        !specialtys ? <TableRowLoader />
                        :
                        specialtys.map( (item) => {
                            return(
                                <tr key={item._id} className="border-x-2 odd:bg-white even:bg-slate-100 last:border-b-2 hover:bg-slate-200">
                                    <td className="py-2 px-1" >{item.name}</td>
                                    <td className="py-2 px-1" >
                                        <img
                                            className="m-auto bg-yellow-400 p-1 rounded cursor-pointer"
                                            src={editIcon}
                                            alt="edit"
                                            onClick={()=>setForm(item)}
                                        />
                                    </td>
                                    <td className="py-2 px-1" >
                                        <img
                                            className="m-auto bg-red-500 p-1 rounded cursor-pointer"
                                            src={removeIcon}
                                            alt="remove"
                                            onClick={()=>remove(item)}
                                        />
                                    </td>
                                </tr>
                            );
                        } )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default Specialty;
export { Specialty };