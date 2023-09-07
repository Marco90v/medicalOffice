import { useFetch } from "../hooks/useFetch";

function Home() {
    const { state, getFetch, setFetch, error:errorFetch } = useFetch<queue>("http://localhost:3000/api/v1/queue");

    return(
        <>Home</>
    );
}

export default Home;
export { Home };