import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import walletReducer from './slices/walletSlice'
import detailsTransactionReducer from './slices/detailsTransaction'

const store = configureStore({
    reducer: {
        auth: authReducer,
        wallet: walletReducer,
        detailsTransaction: detailsTransactionReducer,
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch