import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
    isAuth: boolean
    isLoading: boolean
    error: string
    accessToken: string
}
const initialState: InitialState = {
    isAuth: false,
    isLoading: false,
    error: '',
    accessToken: '',
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
})

export default authSlice.reducer
