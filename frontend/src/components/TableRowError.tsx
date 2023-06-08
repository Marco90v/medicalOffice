interface props {
    error: string,
    span: number
}

function TableRowError({error, span}:props) {
    return(
        <tr className="bg-red-600 text-white font-black">
            <td colSpan={span} className="text-center p-2">
                {error}
            </td>
        </tr>
    );
}
export default TableRowError;
export { TableRowError };