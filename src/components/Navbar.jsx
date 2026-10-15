import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="border-b border-[#e5e4dc] bg-[#f6f4ee] px-6 sm:px-10 lg:px-16">
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between" aria-label="Main navigation">
        <Link to="/" className="text-xl font-semibold tracking-tight text-[#263c2d]">
          goodfinds<span className="text-[#8b9c78]">.</span>
        </Link>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `inline-flex min-h-10 items-center rounded-md px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#263c2d] ${
              isActive
                ? 'bg-[#263c2d] text-white'
                : 'text-[#465248] hover:bg-[#e8eee5] hover:text-[#263c2d]'
            }`
          }
        >
          Products
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
