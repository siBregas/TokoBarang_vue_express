import React from 'react';

const Users = () => {
  return (
    <div>
      <h2>Daftar Users</h2>
      <div style={{ marginBottom: '20px' }}>
        <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Tambah User
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Username</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Role</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>admin</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>admin@example.com</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Administrator</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <button style={{ marginRight: '10px', color: '#007bff', border: 'none', background: 'none', cursor: 'pointer' }}>
                Edit
              </button>
              <button style={{ color: '#dc3545', border: 'none', background: 'none', cursor: 'pointer' }}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
