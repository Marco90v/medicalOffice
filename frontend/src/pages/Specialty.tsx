import { useEffect, useState } from "react";
import { useFetch } from "../hooks/inedx";
import { specialty } from "../type";

import loaderIcon from "../assets/loader-alt-regular-24.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiledRequired } from "../components";

interface IFormInput {
    specialty: string,
}

function Specialty() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [specialtys, setSpecialty] = useState<specialty[] | undefined>();

    const [ specialtysFetch, _, errorFetchGet ] = useFetch("specialty");
    const [ specialty, setspecialty, errorSetSpecialty ] = useFetch();

    useEffect(() => {
        specialtysFetch && setSpecialty(specialtysFetch);
    }, [specialtysFetch]);

    useEffect(() => {
        specialty && 
            setSpecialty( (items) => {
                if(items){
                    return [...items, specialty];
                }else{
                    return undefined;
                }
            });
    }, [specialty]);
    

    const onSubmit:SubmitHandler<IFormInput> = async (data) => {
        // console.log(data);
        // const [ specialtySet ] = await useFetch("specialty", "POST", data);
        // console.log(specialtySet);
        setspecialty("specialty", "POST", data);
    };
    
    return(
        <div className="flex flex-col gap-10 pt-10">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="m-auto w-[30rem] grid grid-cols-4 gap-4 items-center"
            >
                <label htmlFor="specialty">Specialty</label>
                <input
                    className="col-span-2 border border-slate-300 p-1 rounded-md"
                    type="text"
                    id="specialty"
                    {...register("specialty", {required:true} )}
                />
                <button className="bg-green-500 text-white p-1 rounded-md" type="submit">Add</button>
                { errors.specialty &&  <FiledRequired text={"This field is required"} style={"col-span-4"} /> }
                { errorSetSpecialty &&  <FiledRequired text={errorSetSpecialty.error} style={"col-span-4"} /> }
            </form>

            <table className="m-auto table-auto w-[30rem] border border-solid border-slate-500 rounded-md overflow-hidden">
                <thead className="bg-black text-white">
                    <tr>
                        <td className="py-2 px-4" >Specialty</td>
                        <td className="py-2 px-4" >Edit</td>
                        <td className="py-2 px-4" >Remove</td>
                    </tr>
                </thead>
                <tbody >
                    {
                        errorFetchGet?.error ? 
                            (<tr className="bg-red-600 text-white font-black">
                                <td colSpan={3} className="text-center p-2">
                                    {errorFetchGet.error}
                                </td>
                            </tr>) 
                        :
                        !specialtys ? 
                            (<tr>
                                <td colSpan={3}>
                                    <img className="m-auto animate-spin" src={loaderIcon} alt="loader" />
                                </td>
                            </tr> )
                        :
                        specialtys?.map( (item:specialty) => {
                            return(
                                <tr key={item._id} className="border-x-2 odd:bg-white even:bg-slate-100 last:border-b-2 hover:bg-slate-200">
                                    <td className="py-2 px-1" >{item.name}</td>
                                    <td className="py-2 px-1" >E</td>
                                    <td className="py-2 px-1" >R</td>
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