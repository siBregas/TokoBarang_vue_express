import React from 'react';
import { useParams, Link } from 'react-router-dom';

const EditBarang = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Edit Barang (ID: {id})</h2>
      <form>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nama Barang:</label>
          <input 
            type="text" 
            defaultValue="Laptop"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Harga:</label>
          <input 
            type="number" 
            defaultValue="10000000"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Stok:</label>
          <input 
            type="number" 
            defaultValue="5"
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
        </div>
        <div>
          <button 
            type="submit" 
            style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px' }}
          >
            Update
          </button>
          <Link 
            to="/dashboard/barang"
            style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', textDecoration: 'none', borderRadius: '4px' }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditBarang;
