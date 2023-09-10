import { Profile } from ".";
import {
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
} from "react-hook-form";

interface props {
    onSubmit: SubmitHandler<medicalHistory>;
    register: UseFormRegister<medicalHistory>;
    handleSubmit: UseFormHandleSubmit<medicalHistory, undefined>;
    children: React.ReactNode;
}

function FormPatient({ onSubmit, register, handleSubmit, children }: props) {
    return (
        <div className="flex items-center justify-center w-10/12 m-auto h-full">
            <form
                className="bg-gray-200 rounded-md flex flex-col gap-y-1 w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Profile register={register} />
                {children}
            </form>
        </div>
    );
}

export default FormPatient;
export { FormPatient };
