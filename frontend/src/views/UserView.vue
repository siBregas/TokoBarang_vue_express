<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-800">👥 Manajemen User</h2>
        <button 
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          @click="showAddUserModal = true"
        >
          + Tambah User
        </button>
      </div>
      
      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <!-- Search and Filter -->
          <div class="flex flex-wrap gap-4 items-center justify-between mb-6">
            <div class="flex gap-2">
              <input 
                v-model="searchQuery"
                type="text" 
                placeholder="Cari user..."
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <select 
                v-model="selectedRole"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Semua Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div class="text-sm text-gray-600">
              Total: {{ filteredUsers.length }} user
            </div>
          </div>

          <!-- Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <template v-if="loading">
                  <tr v-for="n in 3" :key="n">
                    <td v-for="i in 6" :key="i" class="px-6 py-4">
                      <div class="animate-pulse bg-gray-200 h-4 rounded"></div>
                    </td>
                  </tr>
                </template>
                <tr v-else-if="filteredUsers.length === 0">
                  <td colspan="6" class="px-6 py-8 text-center text-gray-500">
                    <div class="flex flex-col items-center space-y-2">
                      <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                      </svg>
                      <p class="text-lg font-medium">Belum ada user</p>
                      <p class="text-sm">Tambah user baru untuk memulai</p>
                    </div>
                  </td>
                </tr>
                <tr v-else v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ user.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ user.name }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ user.email }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'" 
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ user.role }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'" 
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
                      {{ user.isActive ? 'Aktif' : 'Nonaktif' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      @click="editUser(user)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button 
                      @click="toggleUserStatus(user)"
                      :class="user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'"
                    >
                      {{ user.isActive ? 'Nonaktifkan' : 'Aktifkan' }}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '../layouts/AdminLayout.vue'
import { ref, computed, onMounted } from 'vue'

// Data state
const users = ref([])
const loading = ref(false)
const searchQuery = ref('')
const selectedRole = ref('')
const showAddUserModal = ref(false)

// Computed properties
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = selectedRole.value === '' || user.role === selectedRole.value
    return matchesSearch && matchesRole
  })
})

// Methods
const fetchUsers = async () => {
  loading.value = true
  try {
    // TODO: Implement API call to fetch users
    // const response = await fetch('/api/users')
    // users.value = await response.json()
    
    // Temporary mock data
    users.value = [
      { id: 1, name: 'Admin User', email: 'admin@toko.com', role: 'admin', isActive: true },
      { id: 2, name: 'John Doe', email: 'john@example.com', role: 'user', isActive: true },
      { id: 3, name: 'Jane Smith', email: 'jane@example.com', role: 'user', isActive: false }
    ]
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

const editUser = (user) => {
  // TODO: Implement edit user functionality
  console.log('Edit user:', user)
}

const toggleUserStatus = async (user) => {
  try {
    // TODO: Implement API call to toggle user status
    user.isActive = !user.isActive
    console.log('User status toggled:', user)
  } catch (error) {
    console.error('Error toggling user status:', error)
  }
}

// Lifecycle
onMounted(() => {
  fetchUsers()
})
</script>
