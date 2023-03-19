interface TableRowProps {
    assetName: string
    balance: string
}
export default function TableRow({ assetName, balance }: TableRowProps) {
    return (
        <tr>
            <td>{assetName.toUpperCase()}</td>
            <td>{balance}</td>
            <td>
                <button className="btnInfo">Infos</button>
            </td>
        </tr>
    )
}
