import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUrl, apiEndpoint, API_HOST } from '../../util/api'
import { Crypto } from '../../model/interfaces'
interface InitialState {
    wallet: Crypto[]
    isLoading: boolean
    error: boolean
}

const initialState: InitialState = {
    wallet: [],
    isLoading: false,
    error: false,
}
export const fetchWallet = createAsyncThunk(
    'wallet/fetchWallet',
    async (token: string, thunkAPI) => {
        const url = getUrl(API_HOST, apiEndpoint.assets)
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: ` ${token}`,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchWallet.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchWallet.fulfilled, (state, action) => {
            state.isLoading = false
            state.wallet = action.payload
        })
        builder.addCase(fetchWallet.rejected, (state) => {
            state.isLoading = false
            state.error = true
        })
    },
})

export default walletSlice.reducer
