<template>
  <header class="h-16 bg-white flex justify-between items-center px-6 border-b shadow">
    <h1 class="text-xl font-semibold">🛒 Admin Dashboard</h1>
    <div class="flex items-center gap-4">
      <span class="text-gray-600">Selamat datang, <span class="font-semibold">Admin</span></span>
      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function logout() {
  // Clear all stored data
  localStorage.clear()
  // Redirect to login
  router.push('/')
}
</script>
