import Header from '../Header'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../../redux/store'

describe('Header component', () => {
    it('renders Header component', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Header />
                </Router>
            </Provider>
        )

        expect(screen.queryByTestId('logout')).not.toBeInTheDocument()
    })
})
