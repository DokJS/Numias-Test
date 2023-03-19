import TransactionList from '../TransactionList'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import store from '../../redux/store'

test('TransactionList', () => {
    render(
        <Provider store={store}>
            <TransactionList />
        </Provider>
    )
    expect(screen.getByText('id')).toBeInTheDocument()
    expect(screen.getByText('destination')).toBeInTheDocument()
    expect(screen.getByText('date')).toBeInTheDocument()
    expect(screen.getByText('amount')).toBeInTheDocument()
    expect(screen.getByText('status')).toBeInTheDocument()
    expect(screen.getByText('type')).toBeInTheDocument()
})