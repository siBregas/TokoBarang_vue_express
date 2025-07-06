<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const id = route.params.id
const name = ref('')
const price = ref(0)
const stock = ref(0)
const imageUrl = ref('')

onMounted(async () => {
  const res = await axios.get(`http://localhost:5000/api/items/${id}`)
  name.value = res.data.name
  price.value = res.data.price
  stock.value = res.data.stock
  imageUrl.value = res.data.imageUrl
})

const save = async () => {
  await axios.put(`http://localhost:5000/api/items/${id}`, {
    name: name.value,
    price: price.value,
    stock: stock.value,
    imageUrl: imageUrl.value
  })
  router.push('/admin')
}
</script>

<template>
  <div>
    <h1>Edit Barang</h1>
    <input v-model="name" placeholder="Nama" />
    <input v-model="price" type="number" placeholder="Harga" />
    <input v-model="stock" type="number" placeholder="Stok" />
    <input v-model="imageUrl" placeholder="URL Gambar" />
    <button @click="save">Simpan</button>
  </div>
</template>
