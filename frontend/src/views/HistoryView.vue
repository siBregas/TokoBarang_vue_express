<template>
  <AdminLayout>
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-gray-800">📋 Riwayat Transaksi</h2>

      <div class="bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
          <div class="flex flex-col space-y-4">
            <!-- Filter Section -->
            <div class="flex flex-wrap gap-4 items-center justify-between">
              <div class="flex gap-2">
                <select class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Semua Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Selesai</option>
                  <option value="cancelled">Dibatalkan</option>
                </select>
                <input
                  type="date"
                  class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
              </div>
              <div class="text-sm text-gray-600">
                Total: 0 transaksi
              </div>
            </div>

            <!-- Table Section -->
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID Transaksi
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Item
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Harga
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
                  <!-- Empty State -->
                  <tr>
                    <td colspan="7" class="px-6 py-8 text-center text-gray-500">
                      <div class="flex flex-col items-center space-y-2">
                        <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <p class="text-lg font-medium">Belum ada riwayat transaksi</p>
                        <p class="text-sm">Transaksi akan muncul di sini setelah ada pembelian</p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '../layouts/AdminLayout.vue'
import { ref, onMounted } from 'vue'

// Data state
const transactions = ref([])
const loading = ref(false)
const selectedStatus = ref('')
const selectedDate = ref('')

// Methods
const fetchTransactions = async () => {
  loading.value = true
  try {
    // TODO: Implement API call to fetch transaction history
    // const response = await fetch('/api/transactions')
    // transactions.value = await response.json()

    // Temporary empty state
    transactions.value = []
  } catch (error) {
    console.error('Error fetching transactions:', error)
  } finally {
    loading.value = false
  }
}

const filterTransactions = () => {
  // TODO: Implement filtering logic
  fetchTransactions()
}

const viewTransactionDetail = (transactionId) => {
  // TODO: Implement view detail functionality
  console.log('View transaction:', transactionId)
}

// Lifecycle
onMounted(() => {
  fetchTransactions()
})
</script>
