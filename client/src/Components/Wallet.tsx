import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import { fetchWallet } from '../redux/slices/walletSlice'
export default function Wallet() {
    const dispatch = useAppDispatch()
    const token = useAppSelector((state) => state.auth.accessToken)
    console.log(token)
    useEffect(() => {
        dispatch(fetchWallet(token)) //For fetch wallet data
    }, [])
    return (
        <div>
            <h1>Wallet</h1>
        </div>
    )
}
