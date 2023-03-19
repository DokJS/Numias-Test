import TableRow from '../TableRow'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
test('renders TableRow component', () => {
    render(
        <Router>
            <TableRow assetName="btc" balance={'0.0001'} />
        </Router>
    )

    expect(screen.getByText('BTC')).toBeInTheDocument()
    expect(screen.getByText('0.0001')).toBeInTheDocument()
    expect(screen.getByText('Infos')).toBeInTheDocument()
})
