import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/authHooks/useAuthContext'
import { useLogout } from '../../hooks/authHooks/useLogout'

const Navbar = ({isAdmin}) => {
  const {user} = useAuthContext()

  const {logout} = useLogout()

  const handleLogout = () => {
    logout()
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/" className='navbar-brand'>EasyBuy</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link to="/" className='nav-link'>Home</Link>
            </li>

            {/* user */}
            {!user && (
              <>
              <li className="nav-item">
                <Link to="/signup" className='nav-link'>SIGN UP</Link>
              </li>
              <li className="nav-item">
                  <Link to="/login" className='nav-link'>LOGIN</Link>
              </li>
              </>
            )}
            {user && (
              <>
              <span className='nav-link'>{user.email}</span>
              <Link className='nav-link' onClick={handleLogout}>LOGOUT</Link>
              </>
            )}




            {/* Admin Pannel */}
            {isAdmin && (
              <li className="nav-item"><Link to="/admin" className='nav-link'>Admin</Link></li>
            )}
            
             

            {/* seller  */}
            {user && (
              <li className="nav-item">
              <Link to="/seller/ViewProfile" className='nav-link'>Seller Profile</Link>
              </li>
            )}
         </ul>
        <form className="form-inline my-2 my-lg-0">
         <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
         <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
     </div>
    </nav>
    </>
  )
}

export default Navbar