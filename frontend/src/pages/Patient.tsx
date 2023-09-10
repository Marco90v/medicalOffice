import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils";
import { useFetch } from "../hooks/useFetch";

function Patient(){
    const { dni } = useParams();
    // const { state, getFetch, setFetch, error:errorFetch } = useFetch<queue[]>(BASE_URL, "patient");

    console.log(dni);
    return(
        <></>
    );
}
export default Patient;
export { Patient };