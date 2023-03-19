const express = require('express')
const morgan = require('morgan')
const Ajv = require('ajv')
const multicoin = require('multicoin-address-validator')
const { ulid } = require('ulid')
const { Big } = require('big.js')

const app = express()
const ajv = new Ajv()
const cors = require('cors')
const convertHToMs = require('./convertHToMs')

const port = 4000

const username = 'bob'
const password = 'abc123'
const sessionTime = convertHToMs(process.argv[2]) | (30 * 60 * 1000)

let token = btoa(Date.now())

const rejectedAddresses = {
	eth: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
	btc: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
}

const assets = {
	btc: {
		balance: '1.0439',
		transactions: [],
	},
	eth: {
		balance: '0.7302',
		transactions: [],
	},
	usdt: {
		balance: '425.09',
		transactions: [],
	},
	bnb: {
		balance: '13.918701',
		transactions: [],
	},
	usdc: {
		balance: '2801.25',
		transactions: [],
	},
	xrp: {
		balance: '6560.84',
		transactions: [],
	},
	ada: {
		balance: '412.5',
		transactions: [],
	},
}

app.use(morgan('combined'))
app.use(express.json())
app.use(cors()) // For fixing CORS error during development

app.use(function (req, res, next) {
	if (
		['POST', 'PUT'].includes(req.method) &&
		req.header('content-type') !== 'application/json'
	) {
		return res.status(415).json({
			message: 'unsupported content-type (json only)',
		})
	} else {
		next()
	}
})

app.use(function (req, res, next) {
	console.log(req.path, req.header('authorization'))
	if (
		req.path !== '/token' &&
		(req.header('authorization') !== token ||
			parseInt(atob(token)) < Date.now() - sessionTime)
	) {
		return res.status(401).json({
			message: 'unauthorized',
		})
	} else {
		next()
	}
})

app.use(function (err, req, res, next) {
	console.error(err.stack)
	res.status(500).json({
		message: 'internal server error',
	})
})

app.post('/token', (req, res) => {
	const schema = {
		type: 'object',
		properties: {
			username: { type: 'string' },
			password: { type: 'string' },
		},
		required: ['username', 'password'],
	}

	const valid = ajv.validate(schema, req.body)

	if (!valid) {
		return res.status(400).json({
			message: 'invalid payload',
			errors: ajv.errors,
		})
	}

	if (req.body.username === username && req.body.password === password) {
		token = btoa(Date.now())

		return res.json({
			token,
		})
	}

	res.status(401).json({
		message: 'incorrect username or password',
	})
})

app.get('/assets', (req, res) => {
	res.json(
		Object.keys(assets).reduce((acc, asset) => {
			return [
				...acc,
				{
					name: asset,
					balance: assets[asset].balance,
				},
			]
		}, [])
	)
})

app.get('/assets/:assetName/transactions', (req, res) => {
	const assetName = req.params.assetName.toLowerCase()

	if (assets[assetName] === undefined) {
		return res.status(404).json({
			message: 'asset not found',
		})
	}

	res.json(assets[assetName].transactions)
})

app.get('/assets/:assetName/transactions/:transactionId', (req, res) => {
	const assetName = req.params.assetName.toLowerCase()

	if (assets[assetName] === undefined) {
		return res.status(404).json({
			message: 'asset not found',
		})
	}

	const transaction = assets[assetName].transactions.find(
		tx => tx.id === req.params.transactionId
	)

	if (!transaction) {
		return res.status(404).json({
			message: 'transaction not found',
		})
	}

	res.json(transaction)
})

app.post('/assets/:assetName/payouts', (req, res) => {
	const assetName = req.params.assetName.toLowerCase()

	if (assets[assetName] === undefined) {
		return res.status(404).json({
			message: 'asset not found',
		})
	}

	const schema = {
		type: 'object',
		properties: {
			destination: { type: 'string' },
			amount: { type: 'string' },
		},
		required: ['destination', 'amount'],
	}

	const valid = ajv.validate(schema, req.body)

	if (!valid) {
		return res.status(400).json({
			message: 'invalid payload',
			errors: ajv.errors,
		})
	}

	if (!multicoin.validate(req.body.destination, assetName)) {
		return res.status(400).json({
			message: 'invalid destination address',
		})
	}

	let amount

	try {
		amount = Big(req.body.amount)
	} catch (err) {
		return res.status(400).json({
			message: 'invalid payload',
			errors: ["amount isn't a valid decimal number"],
		})
	}

	const balance = Big(assets[assetName].balance)

	if (balance.lte(amount)) {
		return res.status(400).json({
			message: 'insufficient funds',
		})
	}

	const tx = {
		...req.body,
		id: ulid().toLowerCase(),
		date: new Date().toISOString(),
		type: 'payout',
		status: 'processing',
	}

	assets[assetName].balance = balance.minus(amount).toString()
	assets[assetName].transactions.push(tx)

	// simulate rejection/refund at a later time for specific addresses
	setTimeout(() => {
		if (req.body.destination === rejectedAddresses[assetName]) {
			tx.status = 'rejected'

			assets[assetName].balance = Big(assets[assetName].balance)
				.plus(amount)
				.toString()
			assets[assetName].transactions.push({
				...req.body,
				id: ulid().toLowerCase(),
				date: new Date().toISOString(),
				type: 'refund',
				status: 'confirmed',
			})
		} else {
			tx.status = 'confirmed'
		}
	}, 5000)

	res.status(201).json(tx)
})

app.get('*', (req, res) => {
	res.status(404).json({
		message: 'route not found',
	})
})

app.listen(port, () => {
	console.log(`API listening on port ${port}`)
})
