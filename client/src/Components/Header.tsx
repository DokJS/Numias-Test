import { useAppSelector } from '../redux/hook'
export default function Header() {
    const headerIsShown = useAppSelector((state) => state.auth.headerIsShown)
    if (headerIsShown) {
        return (
            <header>
                <h1>Header</h1>
            </header>
        )
    } else {
        return null
    }
}
