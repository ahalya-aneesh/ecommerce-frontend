import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../redux/userSlice'
import BrandLogo from './BrandLogo'
import '../pages/home.css'

function Navbar() {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [logoutError, setLogoutError] = useState('')
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLogoutError('')
    setLoggingOut(true)

    try {
      await dispatch(logoutUser()).unwrap()
      navigate('/', { replace: true })
    } catch (error) {
      setLogoutError(error)
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <BrandLogo />

      <div className="nav-links">
        {!user && <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : undefined}>Register</NavLink>}
        {!user && <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : undefined}>Login</NavLink>}
        <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink>
        <NavLink to="/products" className={({ isActive }) => isActive ? 'active' : undefined}>Products</NavLink>
        <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'active' : undefined}>Wishlist ♡</NavLink>
        <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : undefined}>Cart</NavLink>
        {user?.role === 'admin' && (
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : undefined}>
            Admin Dashboard
          </NavLink>
        )}
        {user && (
          <button type="button" className="nav-logout-btn" onClick={handleLogout} disabled={loggingOut}>
            {loggingOut ? 'Logging out...' : 'Logout'}
          </button>
        )}
      </div>

      {logoutError && <p className="nav-logout-error" role="alert">{logoutError}</p>}

      <Link to="/products" className="nav-shop-btn">
        Shop Now
      </Link>
    </nav>
  )
}

export default Navbar
