import editIcon from "../assets/edit-alt-solid-24.png";
import removeIcon from "../assets/trash-alt-solid-24.png";
import { specialty } from "../type";

interface props {
    item:specialty,
    setForm:(data:specialty)=>void,
    remove:(data:specialty)=>void
}

function TableSpecialtys({item, setForm, remove}:props) {
    return (
        <tr className="border-x-2 odd:bg-white even:bg-slate-100 last:border-b-2 hover:bg-slate-200">
            <td className="py-2 px-1" >{item.name}</td>
            <td className="py-2 px-1" >
                <img
                    className="m-auto bg-yellow-400 p-1 rounded cursor-pointer"
                    src={editIcon}
                    alt="edit"
                    onClick={()=>setForm(item)}
                />
            </td>
            <td className="py-2 px-1" >
                <img
                    className="m-auto bg-red-500 p-1 rounded cursor-pointer"
                    src={removeIcon}
                    alt="remove"
                    onClick={()=>remove(item)}
                />
            </td>
        </tr>
    );
}
export default TableSpecialtys;
export { TableSpecialtys };