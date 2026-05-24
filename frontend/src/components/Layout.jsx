import { Link, useNavigate } from 'react-router-dom';
import { clearAuth, getRole, getUsername, isAdmin } from '../auth';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const role = getRole();
  const username = getUsername();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  return (
    <>
      <header className="navbar">
        <div>
          <strong>Doctor & Patient Management</strong>
        </div>
        <nav>
          {isAdmin() && <Link to="/doctors">Doctors</Link>}
          <Link to="/patients">Patients</Link>
        </nav>
        <div>
          {username} ({role}){' '}
          <button type="button" className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <main className="container">{children}</main>
    </>
  );
}
