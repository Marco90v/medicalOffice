import { UseFormRegister } from "react-hook-form";
import { useFetch } from "../hooks/useFetch";
import { medicalHistory, specialistByspecialty, specialty } from "../type";
interface props {
    register:UseFormRegister<medicalHistory>,
}

function Offices({register}:props) {
    const {state:specialty} = useFetch<specialty[]>("http://localhost:3000/api/v1/", "specialty");
    const {state:specialists, getFetch} = useFetch<specialistByspecialty[]>("http://localhost:3000/api/v1/");

    const changeSpecialty = (item:React.ChangeEvent<HTMLSelectElement>) => {
        const idSpecialty:string = item.target.value;
        getFetch(`specialist/${idSpecialty}`);
    };
    return(
        <div className="px-6 py-4 grid grid-cols-4 items-center gap-x-8 gap-y-4 bg-green-200">
            <label htmlFor="">Specialty</label>
            <select
                className="p-2 rounded bg-white"
                id="specialty"
                {...register("specialty", {required:true})}
                onChange={changeSpecialty}
            >
                 <option key="0" value="0"></option>
                {
                    specialty?.map( (item) => <option key={item._id} value={item._id}>{item.name}</option> )
                }
            </select>
            <label htmlFor="">Specialist</label>
            <select
                className="p-2 rounded bg-white"
                id="specialist"
                {...register("specialist", {required:true})}
            >
                <option key="0" value="0"></option>
                {
                    specialists?.map( (item) => <option key={item._id} value={item._id}>{`${item.name} ${item.lastName}`}</option> )
                }
            </select>
        </div>
    );
}

export default Offices;
export { Offices };