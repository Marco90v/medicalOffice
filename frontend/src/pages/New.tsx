import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Historical, Offices, Profile } from "../components";
import { IFormInput } from "../type";
import { initicalStateFormNew } from "../utils";
// import { useFetch } from "../hooks/inedx";
// import { useEffect } from "react";

function New() {
    const { register, handleSubmit, control, formState: { errors } } = useForm<IFormInput>({defaultValues:{...initicalStateFormNew}});

    // const { fields, append, remove } = useFieldArray({
    //     control,
    //     name: "background"
    // });

    // const [specialty] = useFetch("specialty");
    

    const onSubmit:SubmitHandler<IFormInput>  = (data) => {
        console.log(data);
    };
    const p = () => {
        console.log("p");
    };

    return(
        <div
            className="flex items-start justify-center w-10/12 m-auto"
        >
            <form
                className="bg-gray-300 p-6 rounded-md flex flex-col gap-6 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Profile register={register} />
                <Offices register={register} />
                <Historical register={register} control={control} />
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