import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
    detailsTransaction: []
    isLoading: boolean
    error: string
}
const initialState: InitialState = {
    detailsTransaction: [],
    isLoading: false,
    error: '',
}

const detailsTransactionSlice = createSlice({
    name: 'detailsTransaction',
    initialState,
    reducers: {},
})

export default detailsTransactionSlice.reducer
