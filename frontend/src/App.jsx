import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { isAuthenticated, getRole } from './auth';
import Login from './pages/Login';
import Doctors from './pages/Doctors';
import Patients from './pages/Patients';

function HomeRedirect() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={getRole() === 'ADMIN' ? '/doctors' : '/patients'} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/doctors"
        element={
          <ProtectedRoute roles={['ADMIN']}>
            <Doctors />
          </ProtectedRoute>
        }
      />
      <Route
        path="/patients"
        element={
          <ProtectedRoute roles={['ADMIN', 'DOCTOR']}>
            <Patients />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<HomeRedirect />} />
      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  );
}
