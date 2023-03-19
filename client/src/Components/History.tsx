import { useEffect } from 'react'
import FormSend from './FormSend'
import TransactionList from './TransactionList'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { fetchDetailsTransaction } from '../redux/slices/detailsTransaction'
export default function History() {
    const { assetName } = useParams()
    const token = useAppSelector((state) => state.auth.accessToken)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (assetName) {
            dispatch(fetchDetailsTransaction({ token, assetName }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <h1>Transactions Details</h1>
            <FormSend assetName={assetName as string} />
            <TransactionList />
        </div>
    )
}
