import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_HOST, apiEndpoint, getUrl } from '../../util/api'
import { Transaction } from '../../model/interfaces'
import { Credential } from '../../model/type'
interface InitialState {
    detailsTransaction: Transaction[]
    isLoading: boolean
    error: boolean
}
const initialState: InitialState = {
    detailsTransaction: [],
    isLoading: false,
    error: false,
}

export const fetchDetailsTransaction = createAsyncThunk(
    'detailsTransaction',
    async (arg: Credential, thunkAPI) => {
        const url = getUrl(
            API_HOST,
            apiEndpoint.transactionsList(arg.assetName)
        )
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: ` ${arg.token}`,
                },
            })
            const data = await response.json()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const detailsTransactionSlice = createSlice({
    name: 'detailsTransaction',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDetailsTransaction.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchDetailsTransaction.fulfilled, (state, action) => {
            state.isLoading = false
            state.detailsTransaction = action.payload
        })
        builder.addCase(fetchDetailsTransaction.rejected, (state) => {
            state.isLoading = false
            state.error = true
        })
    },
})

export default detailsTransactionSlice.reducer
