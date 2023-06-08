import loaderIcon from "../assets/loader-alt-regular-24.png";

function TableRowLoader() {
    return(
        <tr>
            <td colSpan={3}>
                <img className="m-auto animate-spin" src={loaderIcon} alt="loader" />
            </td>
        </tr>
    );
}
export default TableRowLoader;
export { TableRowLoader };