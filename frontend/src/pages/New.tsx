import { SubmitHandler, useForm } from "react-hook-form";
import { Offices, Profile } from "../components";
import { IFormInput } from "../type";
import { initicalStateFormNew } from "../utils";
// import { useFetch } from "../hooks/inedx";
// import { useEffect } from "react";

function New() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({defaultValues:{...initicalStateFormNew}});

    // const [specialty] = useFetch("specialty");
    

    const onSubmit:SubmitHandler<IFormInput>  = (data) => {
        console.log(data);
    };
    const p = () => {
        console.log("p");
    };

    return(
        <div
            className="h-screen flex items-center justify-center w-10/12 m-auto"
        >
            <form
                className="bg-gray-300 p-6 rounded-md"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Profile register={register} />
                <Offices register={register} />
                <button
                    type="submit"
                    className="py-2 px-6 bg-green-500 rounded-md text-white font-black"
                >
                    Send to queue
                </button>
                <button
                    className="py-2 px-6 bg-blue-500 rounded-md text-white font-black"
                    type="button"
                    onClick={p}
                >
                    search
                </button>
            </form>
        </div>
    );
}

export default New;
export { New };