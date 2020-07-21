import React from 'react'
import PropTypes from 'prop-types'
import AdminPage from '../components/admin/AdminPage'

 const propTypes = {
 }

 function Admin(props) {
   return (
     <div>
       <AdminPage {...props}/>

     </div>
   )
 }

 Admin.propTypes = propTypes



 export default Admin
