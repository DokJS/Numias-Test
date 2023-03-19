import { render, screen } from '@testing-library/react'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
describe('App', () => {
    it('renders App component', () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        )
        const userNameInput = screen.getByPlaceholderText('Enter username')
        const passwordInput = screen.getByPlaceholderText('Password')
        const submitButton = screen.getByRole('button', { name: 'Submit' })
        expect(userNameInput).toBeInTheDocument()
        expect(passwordInput).toBeInTheDocument()
        expect(submitButton).toBeInTheDocument()
    })
})
