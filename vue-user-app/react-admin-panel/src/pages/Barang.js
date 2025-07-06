import React from 'react';
import { Link } from 'react-router-dom';

const Barang = () => {
  return (
    <div>
      <h2>Daftar Barang</h2>
      <div style={{ marginBottom: '20px' }}>
        <button style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
          Tambah Barang
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nama Barang</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Harga</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Stok</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Laptop</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Rp 10,000,000</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>5</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>
              <Link to="/dashboard/barang/edit/1" style={{ marginRight: '10px', color: '#007bff' }}>
                Edit
              </Link>
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

export default Barang;
