import React from 'react';

const Login = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Login Page</h2>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <input type="text" placeholder="Username" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
