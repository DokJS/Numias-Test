import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import { Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from './redux/hook'
import { login } from './redux/slices/authSlice'

function App() {
    const [username, setUsername] = useState('bob')
    const [password, setPassword] = useState('abc123')
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    const isLoading = useAppSelector((state) => state.auth.isLoading)
    const isError = useAppSelector((state) => state.auth.isError)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(login({ username, password }))
    }

    if (isLoading) return <div>Loading...</div>
    if (isError) {
        console.error(console.error)

        return (
            <div>
                <h1>There is an Error</h1>
            </div>
        )
    }

    if (isAuth) {
        return <Navigate to="wallet" />
    }

    return (
        <main className="App">
            <Form className="Form" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username :</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password :</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </main>
    )
}

export default App
