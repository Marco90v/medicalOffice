import iconError from "../assets/error-circle-regular-24.png";
interface props {
    text: string,
}

function FiledRequired({text}:props) {
    return(
        <span className="text-sm text-red-600 flex flex-row items-center justify-center gap-2">
            <img src={iconError} alt="error" />
            {text}
        </span>
    );
}
export default FiledRequired;
export { FiledRequired };