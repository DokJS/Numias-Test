import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUrl, API_CONVERTER, apiEndpoint } from '../util/api'

function convertUsdToEuro(usd: number) {
    return usd * 0.84
}
interface TableRowProps {
    assetName: string
    balance: string
}
export default function TableRow({ assetName, balance }: TableRowProps) {
    const [convertedBalanceUsd, setConvertedBalanceUsd] = useState(0)
    useEffect(() => {
        const url = getUrl(
            API_CONVERTER,
            apiEndpoint.convertEndpoint(assetName, balance)
        )
        fetch(url)
            .then((r) => {
                if (r.ok) {
                    return r.json()
                }
            })
            .then((data) => {
                setConvertedBalanceUsd(data.USD)
            })
            .catch((error) => {
                if (error instanceof Error) {
                    console.error(error.message)
                } else {
                    console.error(error)
                }
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <tr>
            <td>{assetName.toUpperCase()}</td>
            <td>
                {balance} = {Math.trunc(convertUsdToEuro(convertedBalanceUsd))}{' '}
                €
            </td>
            <td>
                <Link to={`/history/${assetName}`}>
                    <button className="btnInfo">Infos</button>
                </Link>
            </td>
        </tr>
    )
}
