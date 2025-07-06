<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import AdminLayout from '../layouts/AdminLayout.vue'

const router = useRouter()

const name = ref('')
const description = ref('')
const price = ref(0)
const stock = ref(0)
const imageUrl = ref('')

const submit = async () => {
  await axios.post('http://localhost:5000/api/items', {
    name: name.value,
    description: description.value,
    price: parseInt(price.value),
    stock: parseInt(stock.value),
    imageUrl: imageUrl.value
  })
  router.push('/admin')
}
</script>

<template>
  <AdminLayout>
    <div class="max-w-xl mx-auto bg-white shadow p-6 rounded">
      <h1 class="text-2xl font-bold mb-4">Tambah Barang</h1>

      <div class="space-y-4">
        <div>
          <label class="block font-semibold">Nama Barang</label>
          <input v-model="name" class="w-full border p-2 rounded" placeholder="Contoh: Laptop ASUS" />
        </div>
        <div>
          <label class="block font-semibold">Deskripsi</label>
          <textarea v-model="description" class="w-full border p-2 rounded" rows="3" placeholder="Deskripsi barang..."></textarea>
        </div>
        <div>
          <label class="block font-semibold">Harga</label>
          <input v-model="price" type="number" class="w-full border p-2 rounded" />
        </div>
        <div>
          <label class="block font-semibold">Stok</label>
          <input v-model="stock" type="number" class="w-full border p-2 rounded" />
        </div>
        <div>
          <label class="block font-semibold">URL Gambar</label>
          <input v-model="imageUrl" class="w-full border p-2 rounded" placeholder="https://..." />
        </div>
        <div class="flex justify-end">
          <button @click="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
