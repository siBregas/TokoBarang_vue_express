<template>
  <div class="register-container">
    <div class="register-card">
      <h1 class="register-title">Daftar Akun</h1>
      <form @submit.prevent="register" class="register-form">
        <div class="form-group">
          <label for="name">Nama Lengkap:</label>
          <input
            id="name"
            v-model="name"
            placeholder="Masukkan nama lengkap"
            type="text"
            required
          />
        </div>
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
            minlength="6"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Konfirmasi Password:</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            placeholder="Konfirmasi password"
            type="password"
            required
          />
        </div>
        <button type="submit" :disabled="!isFormValid" class="register-btn">
          {{ loading ? 'Mendaftar...' : 'Daftar' }}
        </button>
        <p v-if="error" class="error-message">{{ error }}</p>
        <p v-if="success" class="success-message">{{ success }}</p>

        <div class="login-link">
          <p>Sudah punya akun?
            <router-link to="/" class="link">Login di sini</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)
const router = useRouter()

const isFormValid = computed(() => {
  return name.value &&
         email.value &&
         password.value &&
         confirmPassword.value &&
         password.value === confirmPassword.value &&
         password.value.length >= 6
})

const register = async () => {
  if (password.value !== confirmPassword.value) {
    error.value = 'Password dan konfirmasi password tidak cocok'
    return
  }

  if (password.value.length < 6) {
    error.value = 'Password minimal 6 karakter'
    return
  }

  try {
    loading.value = true
    error.value = ''
    success.value = ''

    const response = await axios.post('http://localhost:5000/api/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })

    success.value = 'Pendaftaran berhasil! Mengalihkan ke halaman login...'

    // Redirect to login after 2 seconds
    setTimeout(() => {
      router.push('/')
    }, 2000)

  } catch (err) {
    error.value = err.response?.data?.message || 'Terjadi kesalahan saat mendaftar'
    console.error('Register error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.register-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.register-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
}

.register-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
}

.register-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.3s;
  margin-top: 0.5rem;
}

.register-btn:hover:not(:disabled) {
  opacity: 0.9;
}

.register-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.success-message {
  color: #155724;
  text-align: center;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}
</style>
