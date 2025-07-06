import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ 
      backgroundColor: '#343a40', 
      color: 'white', 
      padding: '10px 20px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center' 
    }}>
      <h3 style={{ margin: 0 }}>Admin Panel</h3>
      <div>
        <span style={{ marginRight: '20px' }}>Welcome, Admin</span>
        <button style={{ 
          backgroundColor: '#dc3545', 
          color: 'white', 
          border: 'none', 
          padding: '5px 15px', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
