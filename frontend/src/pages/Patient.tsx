import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL, StyleCSS, initicalStateFormNew } from "../utils";
import { useFetch } from "../hooks/useFetch";
import { FormPatient, Historical } from "../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

function Patient() {
    const navigate = useNavigate();
    const { dni } = useParams();
    const { state, updateFetch } = useFetch<medicalHistory>(BASE_URL, `patient/${dni}`);
    const { register, handleSubmit, control, setValue } = useForm<medicalHistory>({ defaultValues: initicalStateFormNew });

    useEffect(() => {
        if (state) {
            Object.entries(state).map(([key, value]) => setValue(key as item, value));
        }
    }, [state, setValue]);

    const callBackOkSet = () => {
        navigate(`/dashboard`);
    };

    const onSubmit: SubmitHandler<medicalHistory> = (data) => {
        // updateFetch("patient", data, callBackOkSet);
        console.log(data.dni);
    };

    const save: SubmitHandler<medicalHistory> = (data) => {
        updateFetch("patient", data);
    };

    return (
        <FormPatient onSubmit={onSubmit} register={register} handleSubmit={handleSubmit} CSS={StyleCSS.itemsStart} disabled={true}>
            <div className="p-4 grid grid-cols-4 gap-x-8">
                <button type="button" className="btn-new bg-red-500 hover:bg-red-400 col-start-2" onClick={callBackOkSet}>
                    Cancel
                </button>
                <button type="button" className="btn-new bg-yellow-500 hover:bg-yellow-400 col-start-3" onClick={handleSubmit(save)}>
                    Save
                </button>
                <button type="submit" className="btn-new bg-green-500 hover:bg-green-400 col-start-4">
                    Save and Finish
                </button>
            </div>
            <Historical register={register} control={control} />
        </FormPatient>
    );
}
export default Patient;
export { Patient };
