import TableRow from './TableRow'
import { useAppSelector } from '../redux/hook'
import { Crypto } from '../model/interfaces'
export default function CurrencyList() {
    const wallet: Crypto[] = useAppSelector((state) => state.wallet.wallet)
    const thList = ['Currency', 'Balance', 'Infos']
    return (
        <div className="tableContainer">
            <table className="table">
                <thead>
                    <tr>
                        {thList.map((th, index) => {
                            return <th key={index}>{th}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {wallet.map((asset, index) => {
                        return (
                            <TableRow
                                key={index}
                                assetName={asset.name}
                                balance={asset.balance}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
