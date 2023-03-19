import FormSend from '../FormSend'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../redux/store'

describe('FormSend', () => {
    it('renders FormSend component', () => {
        render(
            <Provider store={store}>
                <FormSend assetName="btc" />
            </Provider>
        )

        expect(screen.getByText('Destination:')).toBeInTheDocument()
        expect(
            screen.getByPlaceholderText(
                'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
            )
        ).toBeInTheDocument()
        expect(screen.getByPlaceholderText('0.1')).toBeInTheDocument()
        expect(screen.getByText('Amount:')).toBeInTheDocument()
        expect(screen.getByText('Send')).toBeInTheDocument()
    })
})
