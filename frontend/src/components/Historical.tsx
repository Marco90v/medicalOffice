import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import InputSelect from "./InputSelect";
// import { medicalHistory } from "../types";

interface props {
    register: UseFormRegister<medicalHistory>;
    control: Control<medicalHistory, any>;
}

const itemsSelect: itemsSelect[] = [
    { value: "yes", text: "Yes" },
    { value: "no", text: "No" },
];

const itemsSelectBackground: itemsSelect[] = [
    { value: "Father", text: "Father" },
    { value: "Mother", text: "Mother" },
    { value: "Paternal Grandfather", text: "Paternal Grandfather" },
    { value: "Paternal Grandfather", text: "Paternal Grandfather" },
    { value: "Maternal Grandfather", text: "Maternal Grandfather" },
    { value: "Maternal Grandfather", text: "Maternal Grandfather" },
];

function Historical({ register, control }: props) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "background",
    });

    const appBackground = () => {
        append({
            details: "",
            relationship: "",
        });
    };
    const removeBackground = (index: number) => {
        remove(index);
    };

    return (
        <div className="px-6 py-4 grid grid-cols-4 items-center gap-x-8 gap-y-4">
            {/* ¿Fuma? */}
            <label htmlFor="smoke">Do you smoke?</label>
            <InputSelect key={"smoke"} register={register} name={"smoke"} itemsSelect={itemsSelect} />

            {/* ¿Consume Alcohol? */}
            <label htmlFor="alcohol">Do you consume alcohol?</label>
            <InputSelect key={"alcohol"} register={register} name={"alcohol"} itemsSelect={itemsSelect} />

            {/* ¿Consume Canavis? */}
            <label htmlFor="canavis">Do you consume Canavis?</label>
            <InputSelect key={"canavis"} register={register} name={"canavis"} itemsSelect={itemsSelect} />

            {/* ¿Consume Cocaina? */}
            <label htmlFor="cocaine">Do you use Cocaine?</label>
            <InputSelect key={"cocaine"} register={register} name={"cocaine"} itemsSelect={itemsSelect} />

            {/* Background */}
            {fields.map((field, index) => {
                return (
                    <div key={field.id} className="col-span-4 grid grid-cols-4 gap-4 bg-gray-300 p-2 rounded-md">
                        <label htmlFor={`background.${index}.relationship`}>Relationship</label>
                        <InputSelect
                            key={`background.${index}.relationship`}
                            register={register}
                            name={`background.${index}.relationship`}
                            itemsSelect={itemsSelectBackground}
                            CSS={"col-span-3 "}
                        />

                        <label htmlFor="details">Details</label>
                        <textarea
                            className="col-span-3 p-2 rounded"
                            id="details"
                            cols={30}
                            rows={5}
                            {...register(`background.${index}.details`, {
                                required: true,
                            })}
                        ></textarea>

                        <button className="btn-new p-2 bg-red-600 hover:bg-red-500" onClick={() => removeBackground(index)}>
                            Remove background
                        </button>
                    </div>
                );
            })}
            <button className="btn-new col-start-4 bg-blue-500 hover:bg-blue-400" onClick={appBackground}>
                Add background
            </button>
        </div>
    );
}

export default Historical;
export { Historical };
