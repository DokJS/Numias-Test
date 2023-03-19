import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { fetchWallet } from '../redux/slices/walletSlice'
export default function Wallet() {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.auth.accessToken)
    console.log(token)
    useEffect(() => {
        dispatch(fetchWallet(token)) //For fetch wallet data
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div>
            <h1>Wallet</h1>
            <Link to={`/history/btc`}>btc</Link>
        </div>
    )
}
