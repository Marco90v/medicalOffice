import { useFetch } from "../hooks/useFetch";
import { BASE_URL } from "../utils";

function Home() {
    const { state, getFetch, setFetch, error:errorFetch } = useFetch<queue[]>(BASE_URL, "queue");
    return(
        <ul>
            {
                state?.map(patient=><li key={patient._id}>{patient.patient}</li>)
            }
        </ul>
    );
}

export default Home;
export { Home };