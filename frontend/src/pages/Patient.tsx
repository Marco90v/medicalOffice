import { useParams } from "react-router-dom";
import { BASE_URL, initicalStateFormNew } from "../utils";
import { useFetch } from "../hooks/useFetch";
import { FormPatient, Historical } from "../components";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

function Patient() {
    const { dni } = useParams();
    const { state } = useFetch<medicalHistory>(BASE_URL, `patient/${dni}`);

    const { register, handleSubmit, control, setValue } = useForm<medicalHistory>({ defaultValues: initicalStateFormNew });

    useEffect(() => {
        if (state) {
            Object.entries(state).map(([key, value]) => setValue(key as item, value));
        }
    }, [state, setValue]);

    const onSubmit = () => {
        null;
    };
    return (
        <FormPatient onSubmit={onSubmit} register={register} handleSubmit={handleSubmit}>
            <Historical register={register} control={control} />
        </FormPatient>
    );
}
export default Patient;
export { Patient };
