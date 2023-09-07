import { useState } from "react";
import iconArrowDown from "../assets/chevron-down-regular-24.png";
import iconEdit from "../assets/edit-alt-solid-24.png";
import iconRemove from "../assets/trash-alt-solid-24.png";
// import { specialist } from "../types";
import { UseFormSetValue } from "react-hook-form";

interface props{
    setValue:UseFormSetValue<specialist>,
    item: specialist,
    setEdit: React.Dispatch<React.SetStateAction<boolean>>,
    remove : (item:specialist)=>void
}

function ItemSpecialist({item, setValue, setEdit, remove}:props) {
    const [show, setShow] = useState(false);
    const hide = show ? "py-2 h-36" : "py-0 h-0";
    const arrow = show ? "rotate-180" : "rotate-0";
    const { _id, dni, name, lastName, specialtyName, specialty, phone, email, sex, dateOfBirth } = item;

    const edit = () => {
        setValue("_id",_id);
        setValue("dni",dni);
        setValue("name",name);
        setValue("lastName",lastName);
        setValue("specialty",specialty);
        setValue("phone",phone);
        setValue("email",email);
        setValue("sex",sex);
        setValue("dateOfBirth",dateOfBirth);
        setEdit(true);
    };

    return(
        <li className="rounded-md mb-2 overflow-hidden border border-gray-200">
            <div className="flex flex-row justify-between py-1 px-4 bg-gray-200 font-black items-center">
                <p>{`${item.name} ${item.lastName}`}</p>
                <div>
                    <button
                        className="bg-yellow-500 p-1 rounded transition-all duration-300 hover:bg-yellow-400 hover:shadow-md"
                        onClick={edit}
                    >
                        <img src={iconEdit} alt="arrowDown" />
                    </button>
                    <button
                        className="ml-2 bg-red-600 p-1 rounded transition-all duration-300 hover:bg-red-500 hover:shadow-md"
                        onClick={()=>remove(item)}
                    >
                        <img src={iconRemove} alt="arrowDown" />
                    </button>
                    <button
                        className="ml-4 p-1 rounded bg-gray-100 transition-all duration-300 hover:shadow-md"
                        onClick={()=>setShow(!show)}
                    >
                        <img className={`transition-all duration-300 ${arrow}`} src={iconArrowDown} alt="arrowDown" />
                    </button>
                </div>
            </div>
            <div className={`bg-gray-50 overflow-hidden grid grid-cols-3 gap-4 px-4 justify-center transition-all duration-300 ${hide}`}>
                <p><span className="font-black" >DNI:</span> {dni}</p>
                <p><span className="font-black" >Name:</span> {name}</p>
                <p><span className="font-black" >Last Name:</span> {lastName}</p>
                <p><span className="font-black" >Specialty:</span> {specialtyName}</p>
                <p><span className="font-black" >Phone:</span> {phone}</p>
                <p><span className="font-black" >Email:</span> {email}</p>
                <p><span className="font-black" >Sex:</span> {sex}</p>
                <p><span className="font-black" >Date of birth:</span> {dateOfBirth}</p>
            </div>
        </li>
    );
}
export default ItemSpecialist;
export { ItemSpecialist };