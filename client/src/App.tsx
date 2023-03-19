import React, { useState } from 'react'
import { useAppDispatch } from './redux/hook'
import { login } from './redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'

function App() {
    const [username, setUsername] = useState('bob')
    const [password, setPassword] = useState('abc123')
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(login({ username, password }))
        setTimeout(() => {
            navigate('/wallet')
        }, 2000)
    }

    return (
        <div>
            <h1>My Wallet</h1>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setUsername(e.target.value)
                        }
                    />
                </label>
                <label>
                    Password
                    <input
                        type="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default App
