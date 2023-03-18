import React from 'react'
import { Link } from 'react-router-dom'

import "./AdminPannel.scss"

const AdminPannel = () => {
  return (
    <div className="adminPannel">
      <div className="buttons">
        <Link to={"/admin/sellerManagement"}>
           <button className='btn btn-outline-secondary'>USER MANAGEMENT</button>
        </Link>    
      </div>
    </div>
  )
}

export default AdminPannel