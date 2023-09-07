import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Context } from "../context";
import { FiledRequired } from "../components";
import consultorio from "../assets/consultorio-medico.webp";
import see from "../assets/show-alt-regular-24.png";
import noSee from "../assets/low-vision-regular-24.png";
import { BASE_URL } from "../utils";
interface IFormInput {
    user: string,
    password: string,
}
interface error {
    error: string
}

function Login(){
    const { dispatch } = useContext(Context);
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const [show, setShow] = useState(false);
    const [error, setError] = useState<error | undefined>();

    const handlerShow = () => setShow(!show);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try{
            const resLogin = await fetch(`${BASE_URL}login`, {
                method: "POST",
                body:JSON.stringify(data),
                headers:{
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
            });
            if(resLogin.ok){
                setError(undefined);
                const token:string = await resLogin.text();
                dispatch({ type:"addToken", token });
            }else{
                const e = await resLogin.json();
                setError(e);
            }
        }catch(error){
            console.log(error);
            setError({error:"Failed to fetch"});
        }
    };

    return(
        <main className="w-screen h-screen flex items-center justify-center">
            <section className="grid grid-cols-2 gap-4 w-[66rem] bg-sky-50 p-4 rounded-md">
                <div className="overflow-hidden rounded-md">
                    <img src={consultorio} alt="consultorio" />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-4 m-auto w-80">
                    <label htmlFor="user">User</label>
                    <input type="text" className="p-1 rounded" { ...register("user", {required:true}) } />
                    { errors.user &&  <FiledRequired text={"This field is required"} /> }
                    <label htmlFor="password">Password</label>
                    <div className="relative">
                        <input
                            type={show ? "text" : "password"}
                            className="p-1 rounded w-full"
                            { ...register("password", {required:true}) }
                        />
                        <img
                            src={show ? noSee : see}
                            alt="showOrNot"
                            onClick={handlerShow}
                            className="cursor-pointer absolute top-1 right-1"
                        />
                    </div>
                    { errors.password &&  <FiledRequired text={"This field is required"} /> }
                    <button type="submit" className="bg-green-500 py-2 px-10 rounded-md m-auto">Sign in</button>
                    { error &&  <FiledRequired text={error?.error} /> }
                </form>
            </section>
        </main>
    );
}

export default Login;
export { Login };