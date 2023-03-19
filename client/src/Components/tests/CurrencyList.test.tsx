import CurrencyList from '../CurrencyList'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../redux/store'

describe('CurrencyList', () => {
    it('should render', () => {
        render(
            <Provider store={store}>
                <CurrencyList />
            </Provider>
        )
        expect(screen.getByText('Currency')).toBeInTheDocument()
        expect(screen.getByText('Balance')).toBeInTheDocument()
        expect(screen.getByText('Infos')).toBeInTheDocument()
    })
})
