import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { createPatient, deletePatient, getPatients, updatePatient } from '../api/client';
import { isAdmin } from '../auth';

const emptyForm = { patientName: '', age: '', disease: '' };

export default function Patients() {
  const admin = isAdmin();
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const { data } = await getPatients();
      setPatients(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load patients');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = { ...form, age: Number(form.age) };
    try {
      if (editingId) {
        await updatePatient(editingId, payload);
      } else {
        await createPatient(payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Save failed');
    }
  };

  const handleEdit = (patient) => {
    setEditingId(patient.id);
    setForm({
      patientName: patient.patientName,
      age: String(patient.age),
      disease: patient.disease,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this patient?')) return;
    try {
      await deletePatient(id);
      load();
    } catch (err) {
      setError(err.response?.data?.error || 'Delete failed');
    }
  };

  return (
    <Layout>
      <div className="card">
        <h1>Patients</h1>
        {!admin && <p>Read-only view (DOCTOR role)</p>}
        {error && <p className="error">{error}</p>}

        {admin && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                value={form.patientName}
                onChange={(e) => setForm({ ...form, patientName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Age</label>
              <input
                type="number"
                min="0"
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Disease</label>
              <input
                value={form.disease}
                onChange={(e) => setForm({ ...form, disease: e.target.value })}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update' : 'Add'} Patient
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
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Disease</th>
              {admin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.patientName}</td>
                <td>{p.age}</td>
                <td>{p.disease}</td>
                {admin && (
                  <td>
                    <button type="button" className="btn btn-secondary" onClick={() => handleEdit(p)}>
                      Edit
                    </button>{' '}
                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(p.id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
