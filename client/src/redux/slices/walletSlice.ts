import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
    wallet: []
    isLoading: boolean
    error: string
}

const initialState: InitialState = {
    wallet: [],
    isLoading: false,
    error: '',
}

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {},
})

export default walletSlice.reducer
