import { useAppSelector } from '../redux/hook'
import { Transaction } from '../model/interfaces'
import moment from 'moment'

function cutString(string: string, length: number) {
    return string.length > length ? string.substring(0, length) + '...' : string
}
export default function TransactionList() {
    const thList = ['id', 'destination', 'date', 'amount', 'status', 'type']
    const transactionsList = useAppSelector(
        (state) => state.detailsTransaction.detailsTransaction
    )
    const renderTransaction = (
        { destination, amount, id, date, type, status }: Transaction,
        index: number
    ) => {
        return (
            <tr key={index}>
                <td>{cutString(id, 10)}</td>
                <td>{cutString(destination, 15)}</td>
                <td>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                <td>{amount}</td>
                <td>{status}</td>
                <td>{type}</td>
            </tr>
        )
    }
    return (
        <div className="tableContainer">
            <table className="table">
                <thead>
                    <tr>
                        {thList.map((th, index) => (
                            <th key={index}>{th}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {transactionsList.map(
                        (transaction: Transaction, index: number) => {
                            return renderTransaction(transaction, index)
                        }
                    )}
                </tbody>
            </table>
        </div>
    )
}
