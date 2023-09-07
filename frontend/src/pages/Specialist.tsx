import { useFetch } from "../hooks/useFetch";
// import { specialist, specialty } from "../types";
import iconSpinner from "../assets/loader-alt-regular-24.png";
import { FiledRequired, ItemSpecialist } from "../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Context } from "../context";
import { BASE_URL } from "../utils";

const initicalStateForm:specialist = {
    _id: "",
    dni: "",
    name: "",
    lastName: "",
    specialty: "",
    specialtyName: "",
    phone: "",
    email: "",
    sex: "",
    dateOfBirth: "",
};

function LoaderSpecialist() {
    return(
        <div className="mt-8">
            <img className="m-auto animate-spin" src={iconSpinner} alt="loader" />
        </div>
    );
}

function Specialist() {
    const { dispatch } = useContext(Context);
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<specialist>({defaultValues:{...initicalStateForm}});
    const { dateOfBirth, dni, email, lastName, name, phone, sex, specialtyName } = errors;
    const [edit, setEdit] = useState(false);
    const { state:specialist, setFetch, updateFetch, deleteFetch } = useFetch<specialist>(BASE_URL, "specialist");
    const { state:specialtys } = useFetch<specialty>(BASE_URL, "specialty");    

    const cancel = () => {
        reset();
        setEdit(false);
    };

    const specialistCallBackOk = () => {
        reset();
        setEdit(false);
    };

    const callBackRemoveOk = () => {
        const modal = { msg:"", func:null };
        dispatch({ type:"showModal", modal });
        reset();
    };

    const removeSpecialist = (_id?:string) => {
        deleteFetch("specialist", {_id}, callBackRemoveOk);
    };

    const remove = (item:specialist) => {
        const msg = <>Do you want to remove <span className="underline text-red-600 italic">{item.name} {item.lastName}</span>?</>;
        const modal = {
            msg,
            func: ()=>removeSpecialist(item._id),
            error: ""
        };
        dispatch({ type:"showModal", modal });
    };

    const onSubmit:SubmitHandler<specialist>  = (data) => {
        if(edit){
            updateFetch("specialist", data, specialistCallBackOk);
        }else{
            setFetch("specialist", data, specialistCallBackOk);
        }
    };

    return(
        <div className="felx flex-col justify-center m-auto w-11/12">
            <form
                className="mt-8 bg-gray-200 p-4 grid grid-cols-9 grid-rows-3 gap-4 items-center rounded-md"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="font-black" htmlFor="dni">DNI</label>
                <input type="number" id="dni"
                    className="p-1 rounded col-span-2"
                    {...register("dni", {required:true})}
                />
                <label className="font-black" htmlFor="name">Name</label>
                <input type="text" id="name"
                    className="p-1 rounded col-span-2"
                    {...register("name", {required:true})}
                />
                <label className="font-black" htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName"
                    className="p-1 rounded col-span-2"
                    {...register("lastName", {required:true})}
                />
                <label className="font-black" htmlFor="specialty">Specialty</label>
                <select
                    className="p-1 rounded col-span-2 bg-white"
                    id="specialty"
                    {...register("specialty", {required:true})}
                >
                    <option key="0" value="0"></option>
                    {
                        (specialtys as specialty[])?.map( (item) => <option key={item._id} value={item._id}>{item.name}</option> )
                    }
                </select>
                <label className="font-black" htmlFor="phone">Phone</label>
                <input type="number" id="phone"
                    className="p-1 rounded col-span-2"
                    {...register("phone", {required:true})}
                />
                <label className="font-black" htmlFor="email">Email</label>
                <input type="email" id="email"
                    className="p-1 rounded col-span-2"
                    {...register("email", {required:true})}
                />
                <label className="font-black" htmlFor="sex">Sex</label>
                <select id="sex"
                    className="p-1 rounded col-span-2 bg-white"
                    {...register("sex", {required:true})}
                >
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <label className="font-black" htmlFor="dateOfBirth">Date of birth</label>
                <input type="date" id="dateOfBirth"
                    className="p-1 rounded col-span-2"
                    {...register("dateOfBirth", {required:true})}
                />
                {
                    edit &&
                    <button
                        className="btn-specialist col-start-8 bg-red-600 hover:bg-red-500"
                        type="button"
                        onClick={cancel}
                    >
                        Cancel
                    </button>
                }
                <button
                    className="btn-specialist col-start-9 bg-green-500 hover:bg-green-400"
                    type="submit"
                >
                    Save
                </button>
                { 
                    (dateOfBirth || dni || email || lastName || name || phone || sex || specialtyName)
                    && <FiledRequired text={"All fields are required"} style={"col-span-9"} />
                }
            </form>
            {
                !specialist ? <LoaderSpecialist /> :
                <ul className="mt-4">
                    {
                        (specialist as specialist[])?.map( item => <ItemSpecialist key={item._id} item={item} setValue={setValue} setEdit={setEdit} remove={remove} /> )
                    }
                </ul>
            }
        </div>
    );
}

export default Specialist;
export { Specialist };