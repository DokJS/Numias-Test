import React, { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hook'
import { API_HOST, apiEndpoint, getUrl } from '../util/api'
import { fetchDetailsTransaction } from '../redux/slices/detailsTransaction'
const DEFAULT_ADDRESS = 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
const DEFAULT_AMOUNT = '0.1'

interface FormSendProps {
    assetName: string
}
export default function FormSend({ assetName }: FormSendProps) {
    const [destination, setDestination] = useState(DEFAULT_ADDRESS)
    const [amount, setAmount] = useState(DEFAULT_AMOUNT)
    const token = useAppSelector((state) => state.auth.accessToken)
    const dispatch = useAppDispatch()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const url = getUrl(API_HOST, apiEndpoint.sendPayout(assetName))
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify({
                    destination,
                    amount,
                }),
            })
            if (response.ok) {
                const data = await response.json() // at this momment, the transaction is not yet confirmed
                if (data.status === 'processing') {
                    alert(
                        `Transaction is processing, wait for a while, your balance of ${assetName} will be deducted of ${data.amount}`
                    )
                    // we will fetch details about the transaction
                    const id: string = data.id
                    const url = getUrl(
                        API_HOST,
                        apiEndpoint.specificTransaction(assetName, id)
                    )
                    setTimeout(async () => {
                        try {
                            const response = await fetch(url, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: token,
                                },
                            })
                            if (response.ok) {
                                const data = await response.json()
                                if (data.status !== 'processing') {
                                    if ((data.type = 'refund')) {
                                        alert(
                                            `Transaction is cancelled, your balance of ${assetName} will be refunded of ${data.amount}`
                                        )
                                    } else {
                                        alert(
                                            `Transaction is confirmed, your balance of ${assetName} will be deducted of ${data.amount}`
                                        )
                                    }
                                    dispatch(
                                        fetchDetailsTransaction({
                                            token,
                                            assetName,
                                        })
                                    )
                                } else {
                                    alert('Transaction is still processing')
                                }
                            }
                        } catch (error) {
                            if (error instanceof Error) {
                                alert(error.message)
                            } else {
                                alert('the server is not responding')
                                console.error(error)
                            }
                        }
                    }, 5000)
                } else {
                    alert('something went wrong, can not send')
                }
            }
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            } else {
                alert('the server is not responding')
                console.error(error)
            }
        }
    }
    return (
        <main className="FormSend">
            <form onSubmit={handleSubmit}>
                <label>
                    Destination:
                    <input
                        type="text"
                        value={destination}
                        className="input"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDestination(e.target.value)
                        }
                    />
                </label>
                <label style={{ marginLeft: 40 }}>
                    Amount:
                    <input
                        type="text"
                        value={amount}
                        className="input"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setAmount(e.target.value)
                        }
                    />
                </label>
                <button type="submit">Send</button>
            </form>
        </main>
    )
}
