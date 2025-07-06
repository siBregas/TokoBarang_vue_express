<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const login = async () => {
  if (!email.value || !password.value) {
    error.value = 'Email dan password harus diisi'
    return
  }

  try {
    error.value = ''
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value
    })

    localStorage.setItem('token', res.data.token)
    localStorage.setItem('role', res.data.role)

    if (res.data.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/home')  // Changed from '/user' to '/home'
    }
  } catch (err) {
    error.value = 'Login gagal: ' + (err.response?.data?.message || 'Server error')
    console.error('Login error:', err)
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h1 class="login-title">Login</h1>
      <form @submit.prevent="login" class="login-form">
        <div class="form-group">
          <label for="email">Email:</label>
          <input
            id="email"
            v-model="email"
            placeholder="Masukkan email"
            type="email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            id="password"
            v-model="password"
            placeholder="Masukkan password"
            type="password"
            required
          />
        </div>
        <button type="submit" :disabled="!email || !password">
          Login
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>

        <div class="register-link">
          <p>Belum punya akun?
            <router-link to="/register" class="link">Daftar di sini</router-link>
          </p>
        </div>

        <div class="demo-credentials">
          <p><strong>Demo Account Admin:</strong></p>
          <p>Email: admin@toko.com</p>
          <p>Password: admin123</p>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
}

.login-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #1a1a1a;
  font-size: 2.5rem;
  font-weight: bold;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: bold;
  font-size: 1.1rem;
}

.form-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  background-color: #f8f9fa;
  color: #2c3e50;
  font-weight: 500;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  background-color: #fff;
}

.form-group input::placeholder {
  color: #6c757d;
  font-weight: normal;
}

button {
  background-color: #667eea;
  color: white;
  padding: 14px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;
}

button:hover:not(:disabled) {
  background-color: #5a6fd8;
}

button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: #f8d7da;
  border: 2px solid #f5c6cb;
  border-radius: 6px;
  font-weight: bold;
  font-size: 0.95rem;
}

.demo-credentials {
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #e9ecef;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  text-align: center;
  font-size: 0.95rem;
}

.demo-credentials p {
  margin: 0.4rem 0;
  color: #2c3e50;
}

.demo-credentials p:first-child {
  font-weight: bold;
  color: #495057;
  font-size: 1rem;
}

.register-link {
  text-align: center;
  margin-top: 1.5rem;
}

.register-link p {
  color: #2c3e50;
  font-weight: 500;
  font-size: 1rem;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
}

.link:hover {
  text-decoration: underline;
  color: #5a6fd8;
}
</style>
