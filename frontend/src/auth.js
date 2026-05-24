export function getToken() {
  return localStorage.getItem('token');
}

export function getRole() {
  return localStorage.getItem('role');
}

export function getUsername() {
  return localStorage.getItem('username');
}

export function isAuthenticated() {
  return !!getToken();
}

export function isAdmin() {
  return getRole() === 'ADMIN';
}

export function saveAuth({ token, username, role }) {
  localStorage.setItem('token', token);
  localStorage.setItem('username', username);
  localStorage.setItem('role', role);
}

export function clearAuth() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
}
