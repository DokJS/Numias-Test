import { Link } from 'react-router-dom'
interface TableRowProps {
    assetName: string
    balance: string
}
export default function TableRow({ assetName, balance }: TableRowProps) {
    const handleClick = () => {}
    return (
        <tr>
            <td>{assetName.toUpperCase()}</td>
            <td>{balance}</td>
            <td>
                <Link to={`/history/${assetName}`}>
                    <button className="btnInfo" onClick={handleClick}>
                        Infos
                    </button>
                </Link>
            </td>
        </tr>
    )
}
