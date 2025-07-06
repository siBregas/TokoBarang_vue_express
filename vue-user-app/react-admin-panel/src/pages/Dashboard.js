import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', backgroundColor: '#f4f4f4', padding: '20px' }}>
        <Sidebar />
        <nav>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/dashboard/barang" style={{ textDecoration: 'none', color: '#333' }}>
                Barang
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/dashboard/users" style={{ textDecoration: 'none', color: '#333' }}>
                Users
              </Link>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Link to="/dashboard/history" style={{ textDecoration: 'none', color: '#333' }}>
                History
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main content area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, padding: '20px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
