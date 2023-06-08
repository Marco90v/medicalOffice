import loaderIcon from "../assets/loader-alt-regular-24.png";

interface props {
    span: number
}

function TableRowLoader({span}:props) {
    return(
        <tr>
            <td colSpan={span}>
                <img className="m-auto animate-spin" src={loaderIcon} alt="loader" />
            </td>
        </tr>
    );
}
export default TableRowLoader;
export { TableRowLoader };