<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import AdminLayout from '../layouts/AdminLayout.vue'

const router = useRouter()
const items = ref([])

const fetchItems = async () => {
  const res = await axios.get('http://localhost:5000/api/items')
  items.value = res.data
}

onMounted(fetchItems)

const deleteItem = async (id) => {
  await axios.delete(`http://localhost:5000/api/items/${id}`)
  fetchItems()
}
</script>

<template>
  <AdminLayout>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Daftar Barang</h1>
      <button @click="router.push('/admin/add')" class="bg-blue-500 text-white px-4 py-2 rounded shadow">
        + Tambah Barang
      </button>
    </div>

    <table class="w-full bg-white shadow rounded">
      <thead>
        <tr class="bg-gray-100 text-left">
          <th class="p-2">Nama</th>
          <th class="p-2">Harga</th>
          <th class="p-2">Stok</th>
          <th class="p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id" class="border-t">
          <td class="p-2">{{ item.name }}</td>
          <td class="p-2">Rp{{ item.price }}</td>
          <td class="p-2">{{ item.stock }}</td>
          <td class="p-2 space-x-2">
            <button @click="router.push(`/admin/edit/${item.id}`)" class="bg-green-500 px-3 py-1 text-white rounded">Edit</button>
            <button @click="deleteItem(item.id)" class="bg-red-500 px-3 py-1 text-white rounded">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>
  </AdminLayout>
</template>
