import { UseFormRegister } from "react-hook-form";
import { IFormInput, specialty } from "../type";
import { useFetch } from "../hooks/inedx";

interface props {
    register:UseFormRegister<IFormInput>,
}

function Offices({register}:props) {
    const [ specialty ] = useFetch("specialty");

    const p = () => {
        console.log("pp");
    };
    return(
        <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="">Specialty</label>
            <select
                className="p-2 rounded bg-white"
                id="specialty"
                {...register("specialty", {required:true})}
                onChange={p}
            >
                 <option key="0" value="0"></option>
                {
                    (specialty as specialty[] | undefined )?.map( (item:specialty) => <option key={item._id} value={item._id}>{item.name}</option> )
                }
            </select>
            <label htmlFor="">Specialist</label>
            <select
                className="p-2 rounded bg-white"
                id="specialist"
                {...register("specialist", {required:true})}
            >
                <option value="0">0</option>
                <option value="1">1</option>
            </select>
        </div>
    );
}

export default Offices;
export { Offices };