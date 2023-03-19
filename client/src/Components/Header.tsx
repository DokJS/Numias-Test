import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector, useAppDispatch } from '../redux/hook'
import { useNavigate } from 'react-router-dom'
import { logout } from '../redux/slices/authSlice'
export default function Header() {
    const headerIsShown = useAppSelector((state) => state.auth.headerIsShown)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleClick = () => {
        const choice = window.confirm('Are you sure you want to logout?')
        if (choice) {
            dispatch(logout())
            navigate('/')
        }
    }
    if (headerIsShown) {
        return (
            <header>
                <FontAwesomeIcon
                    icon={faPowerOff}
                    className="icon"
                    onClick={handleClick}
                    data-testid="logout"
                />
            </header>
        )
    } else {
        return null
    }
}
