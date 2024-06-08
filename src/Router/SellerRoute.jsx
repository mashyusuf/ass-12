import { Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'
import useRole from '../hooks/useRole'
const SellerRoute = ({ children }) => {
  const [role, isLoading] = useRole()

  if (isLoading) return  <span className="loading loading-bars loading-lg"></span>
  if (role === 'seller') return children
  return <Navigate to='/dashboard' />
}

export default SellerRoute

SellerRoute.propTypes = {
  children: PropTypes.element,
}