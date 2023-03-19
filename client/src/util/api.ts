export const API_HOST = 'http://localhost:4000'
export const API_CONVERTER = 'https://api.coinconvert.net'
export const apiEndpoint = {
    token: '/token',
    assets: '/assets',
    sendPayout: (assetName: string) => {
        return `/assets/${assetName}/payouts`
    },
    transactionsList: (assetName: string) => {
        return `/assets/${assetName}/transactions`
    },
    specificTransaction: (assetName: string, transactionId: string) => {
        return `/assets/${assetName}/transactions/${transactionId}`
    },
    convertEndpoint: (cryptoCurrency: string, amount: string) => {
        return `/convert/${cryptoCurrency}/usd?amount=${amount}`
    },
}
export const getUrl = (baseUrl: string, endpoint: string) => {
    return `${baseUrl}${endpoint}`
}
