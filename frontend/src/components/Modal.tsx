import { useContext } from "react";
import { Context } from "../context";

function Modal() {
    const { state:{modal}, dispatch } = useContext(Context);

    const accept = () => {
        modal.func();
    };
    const cancel = () => {
        dispatch({ type:"showModal", func:null });
    };

    return (
        !modal.func ? null :
        <div
            className="absolute inset-0 bg-black/90 flex justify-center items-center"
        >
            <div
                className="bg-white w-[30rem] h-60 rounded-md grid items-center grid-cols-2 grid-rows-2 "
            >
                <p className="col-span-2 m-auto font-black">{modal.msg}</p>
                <button
                    className="m-auto py-2 px-4 rounded-md text-white font-black bg-red-600"
                    type="button"
                    onClick={cancel}
                >
                    Cancel
                </button>
                <button
                    className="m-auto py-2 px-4 rounded-md text-white font-black bg-green-600"
                    type="button"
                    onClick={accept}
                >
                    Accept
                </button>
            </div>
        </div>
    );
}
export default Modal;
export { Modal };