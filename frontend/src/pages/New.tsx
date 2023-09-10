import { SubmitHandler, useForm } from "react-hook-form";
import { FiledRequired, FormPatient, Offices } from "../components";
import { BASE_URL, initicalStateFormNew } from "../utils";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";

function New() {
    const { register, handleSubmit, reset, getValues, setValue } =
        useForm<medicalHistory>({ defaultValues: initicalStateFormNew });
    const {
        state,
        getFetch,
        setFetch,
        error: errorFetch,
    } = useFetch<medicalHistory>(BASE_URL);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (edit && state) {
            Object.entries(state).map(([key, value]) =>
                setValue(key as item, value)
            );
        }
    }, [edit, state, setValue]);

    const callBackOkSet = () => {
        reset();
    };

    const onSubmit: SubmitHandler<medicalHistory> = (data) => {
        setFetch("patient", data, callBackOkSet);
    };

    const search = () => {
        const dni = getValues("dni");
        getFetch(`patient/${dni}`, () => setEdit(true));
    };

    const clean = () => {
        reset();
        setEdit(false);
    };

    return (
        <FormPatient
            onSubmit={onSubmit}
            register={register}
            handleSubmit={handleSubmit}
        >
            <Offices register={register} />
            <div className="p-4 grid grid-cols-3 gap-x-8">
                <button
                    type="button"
                    onClick={search}
                    className="btn-new bg-blue-500 hover:bg-blue-400"
                >
                    search
                </button>
                <button
                    type="button"
                    onClick={clean}
                    disabled={!edit}
                    className="btn-new bg-yellow-400 hover:bg-yellow-300 disabled:bg-gray-400"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    className="btn-new bg-green-500 hover:bg-green-400"
                >
                    Send to queue
                </button>
                {errorFetch.getError && (
                    <FiledRequired
                        text={errorFetch.getError?.error || ""}
                        style="col-span-3 mt-4"
                    />
                )}
            </div>
        </FormPatient>
    );
}

export default New;
export { New };
