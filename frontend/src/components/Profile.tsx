import { UseFormRegister } from "react-hook-form";
import InputBasic from "./InputBasic";
import InputSelect from "./InputSelect";
// import { medicalHistory } from "../types";

type props = {
    register: UseFormRegister<medicalHistory>;
    disabled?: boolean;
};

const itemsSelect: itemsSelect[] = [
    { value: "male", text: "Male" },
    { value: "female", text: "Female" },
    { value: "other", text: "Other" },
];

function Profile({ register, disabled = false }: props) {
    return (
        <div className="px-6 py-4 grid grid-cols-4 items-center gap-x-8 gap-y-4">
            <label htmlFor="dni">Identity number</label>
            <InputBasic key={"dni"} type="number" name={"dni"} register={register} disabled={disabled} />

            <label htmlFor="fulName">Full Name</label>
            <InputBasic key={"fulName"} type="text" name={"fullName"} register={register} disabled={disabled} />

            <label htmlFor="fullSurname">Full Surnames</label>
            <InputBasic key={"fullSurname"} type="text" name={"fullSurname"} register={register} disabled={disabled} />

            <label htmlFor="dateOfBirth">Date of birth</label>
            <InputBasic key={"dateOfBirth"} type="date" name={"dateOfBirth"} register={register} disabled={disabled} />

            <label htmlFor="gender">Gender</label>
            <InputSelect key={"gender"} register={register} name={"gender"} itemsSelect={itemsSelect} disabled={disabled} />

            <label htmlFor="email">Email</label>
            <InputBasic key={"email"} type="email" name={"email"} register={register} disabled={disabled} />

            <label htmlFor="phone">Phone</label>
            <InputBasic key={"phone"} type="number" name={"phone"} register={register} disabled={disabled} />
        </div>
    );
}

export default Profile;
export { Profile };
