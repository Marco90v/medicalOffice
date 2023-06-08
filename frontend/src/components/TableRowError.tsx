function TableRowError({error}:{error:string}) {
    return(
        <tr className="bg-red-600 text-white font-black">
            <td colSpan={3} className="text-center p-2">
                {error}
            </td>
        </tr>
    );
}
export default TableRowError;
export { TableRowError };