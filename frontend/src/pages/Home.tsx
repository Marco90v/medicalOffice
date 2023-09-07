import { useFetch } from "../hooks/useFetch";
import { BASE_URL } from "../utils";

function Home() {
    const { state, getFetch, setFetch, error:errorFetch } = useFetch<queue[]>(BASE_URL, "queue");
    return(
        <>Home</>
    );
}

export default Home;
export { Home };