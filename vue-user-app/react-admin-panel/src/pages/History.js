import React from 'react';

const History = () => {
  return (
    <div>
      <h2>History Transaksi</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Tanggal</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>User</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Barang</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Jumlah</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>2025-07-05</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>john_doe</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Laptop</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>1</td>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>Rp 10,000,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default History;
