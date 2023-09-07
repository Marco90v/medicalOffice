import { useState } from "react";
// import { credential } from "../types";
import { UseFormRegister } from "react-hook-form";

import see from "../assets/show-alt-regular-24.png";
import noSee from "../assets/low-vision-regular-24.png";

interface props {
    register: UseFormRegister<credential>,
    name:"password" | "user" | "rePassword" | "_idUser"
}

function InputPassword({register, name}:props) {
    const [show, setShow] = useState(false);

    const handlerShow = () => setShow(!show);

    return(
        <div className="relative">
        <input className="w-full p-1 rounded-md" id={name}
            type={show ? "text" : "password"}
            { ...register(name, {required:true}) }
        />
        <img
            src={show ? noSee : see}
            alt="showOrNot"
            onClick={handlerShow}
            className="cursor-pointer absolute top-1 right-1"
        />
    </div>
    );
}

export default InputPassword;
export { InputPassword };