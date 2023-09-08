import { useFetch } from "../hooks/useFetch";
import { BASE_URL } from "../utils";

function Home() {
    const { state, getFetch, setFetch, error:errorFetch } = useFetch<queue[]>(BASE_URL, "queue");
    return(
        <div className="m-auto">
            <h1 className="text-center mb-4 text-xl font-bold underline underline-offset-4">Patients in queue for care</h1>
            <table className="m-auto border border-solid border-slate-500 overflow-hidden rounded-md">
                <tr className="text-white bg-black">
                    <th className="px-10 py-2">Full Name</th>
                    <th className="px-10 py-2">Patient care</th>
                </tr>
                {
                    state?.map(({_id, patient})=>{
                        return (
                            <tr key={_id} className="text-center border-x-2 odd:b-white even:bg-slate-100 last:border-b-2 hover:bg-slate-200">
                                <td className="py-2 px-1">{patient}</td>
                                <td className="py-2 px-1">
                                    <button type="button" onClick={()=>null}
                                        className="btn bg-blue-500 hover:bg-blue-400 px-2 py-1"
                                    >
                                        Attend
                                    </button>
                                </td>
                            </tr>
                        );
                    })
                }
            </table>
        </div>
    );
}

export default Home;
export { Home };