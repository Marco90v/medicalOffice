import { UseFormRegister } from "react-hook-form";
import { IFormInput } from "../type";

function Profile({register}:{register:UseFormRegister<IFormInput>}) {
    return(
        <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="identityNumber">Identity number</label>
            <input type="number" id="identityNumber"
                className="p-2 rounded"
                { ...register("identityNumber", {required:true}) }
            />
            <label htmlFor="fulName">Full Name</label>
            <input type="text" id="fullName"
                className="p-2 rounded"
                { ...register("fullName", {required:true}) }
            />
            <label htmlFor="fullSurname">Full Surnames</label>
            <input type="text" id="fullSurname"
                className="p-2 rounded"
                { ...register("fullSurname", {required:true}) }
            />
            <label htmlFor="fullSurname">Date of birth</label>
            <input type="date" id="fullSurname"
                className="p-2 rounded"
                { ...register("fullSurname", {required:true}) }
            />
            <label htmlFor="gender">Gender</label>
            <select
                className="p-2 rounded bg-white"
                {...register("gender", {required:true})}
            >
                <option value=""></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <label htmlFor="email">Email</label>
            <input type="email" id="email"
                className="p-2 rounded"
                { ...register("email") }
            />
            <label htmlFor="phone">Phone</label>
            <input type="number" id="phone"
                className="p-2 rounded"
                { ...register("phone", {required:true}) }
            />
        </div>
    );
}

export default Profile;
export { Profile };