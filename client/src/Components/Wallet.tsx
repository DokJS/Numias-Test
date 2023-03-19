import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { fetchWallet } from '../redux/slices/walletSlice'
import { displayHeader } from '../redux/slices/authSlice'
export default function Wallet() {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.auth.accessToken)

    useEffect(() => {
        dispatch(fetchWallet(token)) //For fetch wallet data
        dispatch(displayHeader()) // For display header
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <h1>Wallet</h1>
            <Link to={`/history/btc`}>btc</Link>
        </div>
    )
}
