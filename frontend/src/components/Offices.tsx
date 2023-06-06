import { UseFormRegister } from "react-hook-form";
import { IFormInput, specialist, specialty } from "../type";
import { useFetch } from "../hooks";

interface props {
    register:UseFormRegister<IFormInput>,
}

function Offices({register}:props) {
    const [ specialty ] = useFetch("specialty");
    const [ specialists, setPath ] = useFetch();
    // console.log(specialists);

    const changeSpecialty = (item:React.ChangeEvent<HTMLSelectElement>) => {
        const idSpecialty:string = item.target.value;
        setPath("specialistByspecialty", "POST", {idSpecialty});
    };
    return(
        <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="">Specialty</label>
            <select
                className="p-2 rounded bg-white"
                id="specialty"
                {...register("specialty", {required:true})}
                onChange={changeSpecialty}
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
                <option key="0" value="0"></option>
                {
                    (specialists as specialist[] | undefined )?.map( (item:specialist) => <option key={item._id} value={item._id}>{`${item.name} ${item.lastName}`}</option> )
                }
            </select>
        </div>
    );
}

export default Offices;
export { Offices };