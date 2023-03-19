import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_HOST, apiEndpoint, getUrl } from '../../util/api'
import { User } from '../../model/type'
interface InitialState {
    isAuth: boolean
    isLoading: boolean
    isError: boolean
    accessToken: string
    headerIsShown: boolean
}
const initialState: InitialState = {
    isAuth: false,
    isLoading: false,
    isError: false,
    accessToken: '',
    headerIsShown: false,
}

export const login = createAsyncThunk(
    'auth/login',
    async (data: User, thunkAPI) => {
        const url = getUrl(API_HOST, apiEndpoint.token)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const result = await response.json()
        return result
    }
)
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        displayHeader: (state) => {
            state.headerIsShown = true
        },
        logout: (state) => {
            state.isAuth = false
            state.accessToken = ''
            state.headerIsShown = false
            state.isLoading = false
            state.isError = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.accessToken = action.payload.token
        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
        })
    },
})
export const { displayHeader, logout } = authSlice.actions
export default authSlice.reducer
