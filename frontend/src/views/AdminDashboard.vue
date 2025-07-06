<template>
  <AdminLayout>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-800">📦 Manajemen Barang</h2>
        <router-link
          to="/admin/add"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center"
        >
          <span class="mr-2">+</span> Tambah Barang
        </router-link>
      </div>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-4">
          <!-- Search and Stats -->
          <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
            <div class="flex flex-col sm:flex-row gap-2">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari barang..."
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
              <select
                v-model="sortBy"
                class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="name">Urutkan: Nama</option>
                <option value="price">Urutkan: Harga</option>
                <option value="stock">Urutkan: Stok</option>
              </select>
            </div>
            <div class="flex flex-col sm:flex-row gap-2 text-sm">
              <div class="bg-blue-100 px-3 py-2 rounded-lg">
                <span class="text-blue-800 font-semibold">Total: {{ filteredItems.length }} barang</span>
              </div>
              <div class="bg-green-100 px-3 py-2 rounded-lg">
                <span class="text-green-800 font-semibold">Stok: {{ totalStock }}</span>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="space-y-4">
            <div v-for="n in 5" :key="n" class="animate-pulse">
              <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div class="w-16 h-16 bg-gray-200 rounded"></div>
                <div class="flex-1 space-y-2">
                  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div class="w-20 h-8 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-8">
            <div class="text-red-500 text-6xl mb-4">⚠️</div>
            <p class="text-red-600 mb-4">{{ error }}</p>
            <button @click="fetchItems" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
              Coba Lagi
            </button>
          </div>

          <!-- Items Table -->
          <div v-else class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Barang
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stok
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
                <tr v-if="filteredItems.length === 0">
                  <td colspan="5" class="px-6 py-8 text-center text-gray-500">
                    <div class="flex flex-col items-center space-y-2">
                      <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                      </svg>
                      <p class="text-lg font-medium">{{ searchQuery ? 'Barang tidak ditemukan' : 'Belum ada barang' }}</p>
                      <p class="text-sm">{{ searchQuery ? 'Coba kata kunci lain' : 'Tambah barang baru untuk memulai' }}</p>
                    </div>
                  </td>
                </tr>
                <tr v-else v-for="item in filteredItems" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-12 w-12">
                        <div class="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="h-full w-full object-cover rounded-lg">
                          <span v-else class="text-gray-400 text-lg">📦</span>
                        </div>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">{{ item.name }}</div>
                        <div v-if="item.description" class="text-sm text-gray-500">{{ item.description }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm font-semibold text-green-600">{{ formatCurrency(item.price) }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="item.stock > 10 ? 'bg-green-100 text-green-800' : item.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ item.stock }} unit
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="item.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ item.stock > 0 ? 'Tersedia' : 'Habis' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <router-link
                      :to="`/admin/edit/${item.id}`"
                      class="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-3 py-1 rounded transition-colors"
                    >
                      Edit
                    </router-link>
                    <button
                      @click="deleteItem(item)"
                      class="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded transition-colors"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="showDeleteModal = false">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" @click.stop>
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg class="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg leading-6 font-medium text-gray-900 mt-2">Hapus Barang</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Apakah Anda yakin ingin menghapus barang <strong>"{{ itemToDelete?.name }}"</strong>?
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
          <div class="items-center px-4 py-3 space-x-2">
            <button
              @click="confirmDelete"
              :disabled="deleting"
              class="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50"
            >
              {{ deleting ? 'Menghapus...' : 'Ya, Hapus' }}
            </button>
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Batal
            </button>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '../layouts/AdminLayout.vue'
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

// Data state
const items = ref([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const sortBy = ref('name')
const showDeleteModal = ref(false)
const itemToDelete = ref(null)
const deleting = ref(false)

// Computed properties
const filteredItems = computed(() => {
  let filtered = items.value.filter(item =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (item.description && item.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
  )

  // Sort items
  return filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'price':
        return a.price - b.price
      case 'stock':
        return b.stock - a.stock
      default:
        return a.name.localeCompare(b.name)
    }
  })
})

const totalStock = computed(() => {
  return items.value.reduce((total, item) => total + item.stock, 0)
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR'
  }).format(amount)
}

const fetchItems = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await axios.get('http://localhost:5000/api/items')
    items.value = response.data
  } catch (err) {
    error.value = 'Gagal memuat data barang: ' + (err.response?.data?.message || err.message)
    console.error('Error fetching items:', err)
  } finally {
    loading.value = false
  }
}

const deleteItem = (item) => {
  itemToDelete.value = item
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  if (!itemToDelete.value) return

  deleting.value = true
  try {
    await axios.delete(`http://localhost:5000/api/items/${itemToDelete.value.id}`)

    // Remove item from local state
    items.value = items.value.filter(item => item.id !== itemToDelete.value.id)

    showDeleteModal.value = false
    itemToDelete.value = null
  } catch (err) {
    error.value = 'Gagal menghapus barang: ' + (err.response?.data?.message || err.message)
    console.error('Error deleting item:', err)
  } finally {
    deleting.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchItems()
})
</script>
