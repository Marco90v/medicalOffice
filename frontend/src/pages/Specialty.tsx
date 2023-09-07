import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiledRequired, TableRowError, TableRowLoader, TableSpecialtys } from "../components";
import { Context } from "../context";
import { useFetch } from "../hooks/useFetch";
// import { specialty } from "../types";

const initialForm:specialty = {
    _id:"",
    name:"",
};

function Specialty() {
    const { dispatch } = useContext(Context);

    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<specialty>({defaultValues:initialForm});
    const [edit, setEdit] = useState(false);

    const {state:specialtys, setFetch, updateFetch, deleteFetch, error} = useFetch<specialty[]>("http://localhost:3000/api/v1/", "specialty");
    const {getError, setError, updateError, removeError} = error;

    useEffect(() => {
        const error = removeError ? removeError.error : removeError;
        dispatch({ type:"modalError", error });
    }, [removeError, dispatch]);

    const callBackUpdateFetch = () => {
        setEdit(false);
        reset();
    };

    const onSubmit:SubmitHandler<specialty> = async (data:specialty) => {
        if(edit){
            updateFetch("specialty", (data as specialty[]), callBackUpdateFetch);
        }else{
            const specialty:specialty = {name:data.name};
            setFetch("specialty", (specialty as specialty[]), reset);
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
        const modal = { msg:"", func:null };
        dispatch({ type:"showModal", modal });
        reset();
    };

    const callBackRemove = (_id?:string) => {
        const id:specialty = {_id};
        deleteFetch("specialty", (id as specialty[]), callBackRemoveOk);
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
                <label htmlFor="name" className="font-black">Specialty</label>
                <input
                    className={`${edit ? "col-span-2" : "col-span-3"} border border-slate-300 p-1 rounded-md`}
                    type="text"
                    id="name"
                    {...register("name", {required:true} )}
                />
                {edit && <button className="btn bg-red-500 hover:bg-red-400" type="button" onClick={cancel}>Cancel</button>}
                <button className="btn bg-green-500 hover:bg-green-400" type="submit">{edit ? "Save": "Add"}</button>
                { errors.name &&  <FiledRequired text={"This field is required"} style={"col-span-4"} /> }
                { (setError || updateError) &&  <FiledRequired text={setError?.error || updateError?.error || ""} style={"col-span-4"} /> }
            </form>

            <table className="m-auto table-auto w-[30rem] border border-solid border-slate-500 rounded-md overflow-hidden">
                <thead className="bg-black text-white font-black">
                    <tr>
                        <td className="py-2 px-4" >Specialty</td>
                        <td className="py-2 px-4 text-center" >Edit</td>
                        <td className="py-2 px-4 text-center" >Remove</td>
                    </tr>
                </thead>
                <tbody >
                    {
                        getError?.error ? <TableRowError span={3} error={getError.error} /> :
                            !specialtys ? <TableRowLoader span={3} /> :
                                specialtys.map( item => <TableSpecialtys key={item._id} item={item} setForm={setForm} remove={remove} /> )
                    }
                </tbody>
            </table>
        </div>
    );
}
export default Specialty;
export { Specialty };