import { useContext } from "react";
import { Context } from "../context";

function Modal() {
    const { state:{modal}, dispatch } = useContext(Context);

    const accept = () => {
        modal.func();
    };
    const cancel = () => {
        dispatch({ type:"cancelModal" });
    };

    return (
        !modal?.func ? null :
        <div
            className="absolute inset-0 bg-black/90 flex justify-center items-center"
        >
            <div
                className="bg-white w-[30rem] h-40 rounded-md grid items-center grid-cols-2 grid-rows-3 "
            >
                <p className="col-span-2 m-auto font-black">{modal.msg}</p>
                <p className="col-span-2 m-auto text-red-600">{modal.error}</p>
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