import { useEffect } from 'react'
import CurrencyList from './CurrencyList'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { fetchWallet } from '../redux/slices/walletSlice'
import { displayHeader } from '../redux/slices/authSlice'
export default function Wallet() {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.auth.accessToken)
    const isLoading = useAppSelector((state) => state.wallet.isLoading)
    const error = useAppSelector((state) => state.wallet.error)

    useEffect(() => {
        dispatch(fetchWallet(token)) //For fetch wallet data
        dispatch(displayHeader()) // For display header
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return (
            <div>
                <h1>There is an Error</h1>
            </div>
        )
    }
    return (
        <main className="Wallet">
            <h1>Your Wallet</h1>
            <CurrencyList />
        </main>
    )
}
