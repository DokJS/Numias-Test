export interface Crypto {
    name: string
    balance: string
}
export interface Transaction {
    destination: string
    amount: string
    id: string
    date: string
    type: 'refund' | 'payout'
    status: string
}
