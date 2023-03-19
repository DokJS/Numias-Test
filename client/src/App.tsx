import React, { useState } from 'react'

function App() {
	const [username, setUsername] = useState('bob')
	const [password, setPassword] = useState('abc123')

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const res = await fetch('/token', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		})

		const json = await res.json()
		console.log('auth token', json.token)
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
						onChange={(
							e: React.ChangeEvent<HTMLInputElement>
						) => setUsername(e.target.value)}
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(
							e: React.ChangeEvent<HTMLInputElement>
						) => setPassword(e.target.value)}
					/>
				</label>
				<button type="submit">Send</button>
			</form>
		</div>
	)
}

export default App
