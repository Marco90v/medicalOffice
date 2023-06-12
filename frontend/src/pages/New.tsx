import { SubmitHandler, useForm } from "react-hook-form";
import { Historical, Offices, Profile } from "../components";
import { initicalStateFormNew } from "../utils";
import { medicalHistory } from "../type";
import { useFetch } from "../hooks/useFetch";

function New() {
    const { register, handleSubmit, control, reset,  formState: { errors } } = useForm<medicalHistory>({defaultValues:{...initicalStateFormNew}});
    const { state, getFetch, setFetch } = useFetch("http://localhost:3000/api/v1/");

    const onSubmit:SubmitHandler<medicalHistory>  = (data) => {
        // console.log(data);
        setFetch("patient", data, ()=>reset());
    };
    const search = () => {
        console.log("search");
    };

    return(
        <div
            className="flex items-start justify-center w-10/12 m-auto"
        >
            <form
                className="bg-gray-200 rounded-md flex flex-col gap-y-1 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Profile register={register} />
                <Offices register={register} />
                <Historical register={register} control={control} />
                <div className="px-6 py-4 grid grid-cols-3 gap-4 items-center">
                    <label htmlFor="reason">Reason for the consultation?</label>
                    <input
                        className="py-2 px-2 col-span-2 rounded"
                        type="text" id="reason"
                        { ...register("reason") }
                    />
                    <label htmlFor="result">Result of the consultation</label>
                    <input
                        className="py-2 px-2 col-span-2 rounded"
                        type="text" id="result"
                        { ...register("result") }
                    />
                </div>
                <div className="p-4 grid grid-cols-2 gap-x-8">
                    <button type="button" onClick={search}
                        className="btn-new bg-blue-500 hover:bg-blue-400"
                    >
                        search
                    </button>
                    <button type="submit"
                        className="btn-new bg-green-500 hover:bg-green-400"
                    >
                        Send to queue
                    </button>
                </div>
            </form>
        </div>
    );
}

export default New;
export { New };