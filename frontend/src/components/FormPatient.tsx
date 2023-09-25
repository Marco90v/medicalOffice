import { Profile } from ".";
import { SubmitHandler, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface props {
    onSubmit: SubmitHandler<medicalHistory>;
    register: UseFormRegister<medicalHistory>;
    handleSubmit: UseFormHandleSubmit<medicalHistory, undefined>;
    children: React.ReactNode;
    CSS?: string;
    disabled?: boolean;
}

function FormPatient({ onSubmit, register, handleSubmit, children, CSS = "items-center", disabled = false }: props) {
    return (
        <div className={`flex justify-center w-10/12 m-auto h-full ${CSS}`}>
            <form className="bg-gray-200 rounded-md flex flex-col gap-y-1 w-full" onSubmit={handleSubmit(onSubmit)}>
                <Profile register={register} disabled={disabled} />
                {children}
            </form>
        </div>
    );
}

export default FormPatient;
export { FormPatient };
