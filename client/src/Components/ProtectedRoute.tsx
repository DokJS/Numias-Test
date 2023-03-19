import { Fragment } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hook'
interface ProtectedRouteProps {
    children: React.ReactNode
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const isAuth = useAppSelector((state) => state.auth.isAuth)
    if (!isAuth) {
        alert('You are not authorized to view this page')
        return <Navigate to="/" />
    }
    return <Fragment>{children}</Fragment>
}
