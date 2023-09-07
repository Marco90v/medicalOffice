import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
// import { medicalHistory } from "../types";

interface props {
    register:UseFormRegister<medicalHistory>,
    control:Control<medicalHistory, any>
}

function Historical({register, control}:props) {

    const { fields, append, remove } = useFieldArray({
        control,
        name: "background"
    });

    const appBackground = () => {
        append({
            details:"", relationship:""
        });
    };
    const removeBackground = (index:number) => {
        remove(index);
    };

    return(
        <div className="px-6 py-4 grid grid-cols-4 items-center gap-x-8 gap-y-4">
            {/* ¿Fuma? */}
            <label htmlFor="smoke">Do you smoke?</label>
            <select
                className="p-2 rounded bg-white"
                id="smoke"
                {...register("smoke")}
            >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            {/* ¿Consume Alcohol? */}
            <label htmlFor="alcohol">Do you consume alcohol?</label>
            <select
                className="p-2 rounded bg-white"
                id="alcohol"
                {...register("alcohol")}
            >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            {/* ¿Consume Canavis? */}
            <label htmlFor="canavis">Do you consume Canavis?</label>
            <select
                className="p-2 rounded bg-white"
                id="canavis"
                {...register("canavis")}
            >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            {/* ¿Consume Cocaina? */}
            <label htmlFor="cocaine">Do you use Cocaine?</label>
            <select
                className="p-2 rounded bg-white"
                id="cocaine"
                {...register("cocaine")}
            >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            {/* Background */}
            {
                fields.map( (field, index) => {
                    return (
                        <div key={field.id} className="col-span-4 grid grid-cols-4 gap-4 bg-gray-300 p-2 rounded-md" >
                            <label htmlFor="relationship">Relationship</label>
                            <select
                                className="col-span-3 p-2 rounded bg-white"
                                id="relationship"
                                {...register(`background.${index}.relationship` as const)}
                            >
                                <option value=""></option>
                                <option value="Father">Father</option>
                                <option value="Mother">Mother</option>
                                <option value="Paternal Grandfather">Paternal Grandfather</option>
                                <option value="Paternal Grandmother">Paternal Grandmother</option>
                                <option value="Maternal Grandfather">Maternal Grandfather</option>
                                <option value="Maternal Grandmother">Maternal Grandmother</option>
                            </select>
                            <label htmlFor="details">Details</label>
                            <textarea
                                className="col-span-3 p-2 rounded"
                                id="details" cols={30} rows={5}
                                {...register(`background.${index}.details` as const)}
                            ></textarea>
                            <button
                                className="btn-new p-2 bg-red-600 hover:bg-red-500"
                                onClick={()=>removeBackground(index)}
                            >
                                Remove background
                            </button>
                        </div>
                    );
                } )
            }
            <button
                className="btn-new col-start-4 bg-green-500 hover:bg-green-400"
                onClick={appBackground}
            >
                Add background
            </button>
        </div>
    );
}

export default Historical;
export { Historical };