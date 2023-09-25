import { UseFormRegister } from "react-hook-form";

type props = {
    register: UseFormRegister<medicalHistory>;
    name: "gender" | "smoke" | "alcohol" | "canavis" | "cocaine" | `background.${number}.relationship`;
    itemsSelect: itemsSelect[];
    disabled?: boolean;
    CSS?: string;
};

function InputSelect({ register, name, itemsSelect, disabled, CSS }: props) {
    return (
        <select id={name} className={`p-2 rounded bg-white disabled:bg-gray-300 ${CSS}`} {...register(name, { required: true })} disabled={disabled}>
            <option value=""></option>
            {itemsSelect.map((item, idx) => (
                <option key={idx} value={item.value}>
                    {item.text}
                </option>
            ))}
        </select>
    );
}
export default InputSelect;
export { InputSelect };
