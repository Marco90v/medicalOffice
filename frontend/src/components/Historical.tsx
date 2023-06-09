import { Control, UseFormRegister, useFieldArray } from "react-hook-form";
import { IFormInput } from "../type";

interface props {
    register:UseFormRegister<IFormInput>,
    control:Control<IFormInput, any>
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
        <div className="grid grid-cols-4 items-center gap-4">
            {/* ¿Fuma? */}
            <label htmlFor="smoke">Do you smoke?</label>
            <select
                className="p-2 rounded bg-white"
                id="smoke"
                {...register("smoke", {required:true})}
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
                {...register("alcohol", {required:true})}
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
                {...register("canavis", {required:true})}
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
                {...register("cocaine", {required:true})}
            >
                <option value=""></option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>

            {/* Background */}
            {
                fields.map( (field, index) => {
                    return (
                        <div key={field.id} className="col-span-4 grid grid-cols-4 gap-4 bg-gray-200 p-2 rounded-md" >
                            <label htmlFor="relationship">Relationship</label>
                            <select
                                className="col-span-3 p-2 rounded bg-white"
                                id="relationship"
                                {...register(`background.${index}.relationship` as const, {required:true})}
                            >
                                <option value="0">0</option>
                                <option value="1">1</option>
                            </select>
                            <label htmlFor="details">Details</label>
                            <textarea
                                className="col-span-3 p-2 rounded"
                                id="details" cols={30} rows={5}
                                {...register(`background.${index}.details` as const, {required:true})}
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