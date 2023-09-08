import { useParams } from "react-router-dom";

function Patient(){
    const { dni } = useParams();
    console.log(dni);
    return(
        <></>
    );
}
export default Patient;
export { Patient };