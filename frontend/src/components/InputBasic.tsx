import { UseFormRegister } from "react-hook-form";

type props = {
    register: UseFormRegister<medicalHistory>;
    type: "number" | "text" | "date" | "email";
    name: item;
    disabled?: boolean;
};

function InputBasic({ register, type, name, disabled = false }: props) {
    return <input type={type} id={name} className="p-2 rounded disabled:bg-gray-300" {...register(name, { required: true })} disabled={disabled} />;
}

export default InputBasic;
export { InputBasic };
