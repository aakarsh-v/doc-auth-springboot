import { Navigate } from 'react-router-dom';
import { isAuthenticated, getRole } from '../auth';

export default function ProtectedRoute({ children, roles }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(getRole())) {
    return <Navigate to="/patients" replace />;
  }

  return children;
}
