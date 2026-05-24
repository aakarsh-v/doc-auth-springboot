import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { createDoctor, deleteDoctor, getDoctors, updateDoctor } from '../api/client';

const emptyForm = { doctorName: '', specialization: '', email: '' };

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const { data } = await getDoctors();
      setDoctors(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load doctors');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await updateDoctor(editingId, form);
      } else {
        await createDoctor(form);
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    }
  };

  const handleEdit = (doctor) => {
    setEditingId(doctor.id);
    setForm({
      doctorName: doctor.doctorName,
      specialization: doctor.specialization,
      email: doctor.email,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this doctor?')) return;
    try {
      await deleteDoctor(id);
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Delete failed');
    }
  };

  return (
    <Layout>
      <div className="card">
        <h1>Doctors</h1>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              value={form.doctorName}
              onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Specialization</label>
            <input
              value={form.specialization}
              onChange={(e) => setForm({ ...form, specialization: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Update' : 'Add'} Doctor
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d.id}>
                <td>{d.doctorName}</td>
                <td>{d.specialization}</td>
                <td>{d.email}</td>
                <td>
                  <button type="button" className="btn btn-secondary" onClick={() => handleEdit(d)}>
                    Edit
                  </button>{' '}
                  <button type="button" className="btn btn-danger" onClick={() => handleDelete(d.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
