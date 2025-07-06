<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-2xl font-bold text-gray-900">🛒 Toko Barang</h1>
          <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
            Logout
          </button>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex gap-8">
        <!-- Product List -->
        <div class="flex-1">
          <h2 class="text-xl font-semibold mb-6">Daftar Barang</h2>

          <!-- Loading State -->
          <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="n in 6" :key="n" class="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div class="h-48 bg-gray-200 rounded mb-4"></div>
              <div class="h-4 bg-gray-200 rounded mb-2"></div>
              <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-8">
            <p class="text-red-600 mb-4">{{ error }}</p>
            <button @click="fetchItems" class="bg-blue-500 text-white px-4 py-2 rounded">
              Coba Lagi
            </button>
          </div>

          <!-- Products Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="item in items" :key="item.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <!-- Product Image -->
              <div class="h-48 bg-gray-200 flex items-center justify-center">
                <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-cover">
                <div v-else class="text-gray-400 text-4xl">📦</div>
              </div>

              <!-- Product Info -->
              <div class="p-4">
                <h3 class="font-semibold text-lg mb-2">{{ item.name }}</h3>
                <p class="text-gray-600 text-sm mb-3">{{ item.description }}</p>
                <div class="flex items-center justify-between mb-4">
                  <span class="text-xl font-bold text-green-600">{{ formatCurrency(item.price) }}</span>
                  <span class="text-sm text-gray-500">Stok: {{ item.stock }}</span>
                </div>

                <!-- Quantity Controls -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center border rounded-lg">
                    <button
                      @click="decreaseQuantity(item.id)"
                      :disabled="getItemQuantity(item.id) <= 0"
                      class="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg"
                    >
                      -
                    </button>
                    <input
                      :value="getItemQuantity(item.id)"
                      @input="updateQuantity(item.id, $event.target.value)"
                      type="number"
                      min="0"
                      :max="item.stock"
                      class="w-16 px-2 py-1 text-center border-x focus:outline-none"
                    >
                    <button
                      @click="increaseQuantity(item.id)"
                      :disabled="getItemQuantity(item.id) >= item.stock"
                      class="px-3 py-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg"
                    >
                      +
                    </button>
                  </div>

                  <div class="text-right">
                    <div class="text-sm text-gray-500">Total:</div>
                    <div class="font-semibold text-green-600">
                      {{ formatCurrency(item.price * getItemQuantity(item.id)) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!loading && !error && items.length === 0" class="text-center py-12">
            <div class="text-6xl mb-4">📦</div>
            <h3 class="text-xl font-semibold text-gray-600 mb-2">Belum ada barang</h3>
            <p class="text-gray-500">Barang akan ditampilkan di sini setelah admin menambahkannya</p>
          </div>
        </div>

        <!-- Shopping Cart Sidebar -->
        <div class="w-80 sticky top-24 h-fit">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-lg font-semibold mb-4 flex items-center">
              🛒 Keranjang Belanja
              <span v-if="cartCount > 0" class="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {{ cartCount }}
              </span>
            </h3>

            <!-- Cart Items -->
            <div v-if="cartItems.length === 0" class="text-center py-8 text-gray-500">
              <div class="text-4xl mb-2">🛒</div>
              <p>Keranjang kosong</p>
            </div>

            <div v-else class="space-y-3 mb-6 max-h-96 overflow-y-auto">
              <div v-for="cartItem in cartItems" :key="cartItem.id" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex-1">
                  <h4 class="font-medium text-sm">{{ cartItem.name }}</h4>
                  <p class="text-xs text-gray-600">{{ formatCurrency(cartItem.price) }} x {{ cartItem.quantity }}</p>
                </div>
                <div class="text-right">
                  <p class="font-semibold text-green-600">{{ formatCurrency(cartItem.price * cartItem.quantity) }}</p>
                  <button @click="removeFromCart(cartItem.id)" class="text-red-500 hover:text-red-700 text-xs">
                    Hapus
                  </button>
                </div>
              </div>
            </div>

            <!-- Cart Total -->
            <div v-if="cartItems.length > 0" class="border-t pt-4">
              <div class="flex justify-between items-center mb-4">
                <span class="text-lg font-semibold">Total:</span>
                <span class="text-xl font-bold text-green-600">{{ formatCurrency(cartTotal) }}</span>
              </div>

              <button
                @click="checkout"
                :disabled="cartItems.length === 0"
                class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const items = ref([])
const loading = ref(false)
const error = ref(null)
const cart = ref([])

// Computed properties
const cartItems = computed(() => {
  return cart.value.map(cartItem => {
    const item = items.value.find(item => item.id === cartItem.id)
    return { ...item, quantity: cartItem.quantity }
  }).filter(item => item && item.quantity > 0)
})

const cartTotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const cartCount = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0)
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
  error.value = null

  try {
    const res = await axios.get('http://localhost:5000/api/items')
    items.value = res.data
    console.log('Items loaded:', res.data)
  } catch (err) {
    error.value = 'Gagal memuat data barang: ' + err.message
    console.error('Error fetching items:', err)
  } finally {
    loading.value = false
  }
}

const getItemQuantity = (itemId) => {
  const cartItem = cart.value.find(item => item.id === itemId)
  return cartItem ? cartItem.quantity : 0
}

const updateQuantity = (itemId, quantity) => {
  const qty = parseInt(quantity) || 0
  const item = items.value.find(item => item.id === itemId)

  if (qty > item.stock) return

  const existingCartItem = cart.value.find(item => item.id === itemId)

  if (existingCartItem) {
    if (qty === 0) {
      cart.value = cart.value.filter(item => item.id !== itemId)
    } else {
      existingCartItem.quantity = qty
    }
  } else if (qty > 0) {
    cart.value.push({ id: itemId, quantity: qty })
  }

  saveCartToStorage()
}

const increaseQuantity = (itemId) => {
  const currentQty = getItemQuantity(itemId)
  const item = items.value.find(item => item.id === itemId)

  if (currentQty < item.stock) {
    updateQuantity(itemId, currentQty + 1)
  }
}

const decreaseQuantity = (itemId) => {
  const currentQty = getItemQuantity(itemId)
  if (currentQty > 0) {
    updateQuantity(itemId, currentQty - 1)
  }
}

const removeFromCart = (itemId) => {
  cart.value = cart.value.filter(item => item.id !== itemId)
  saveCartToStorage()
}

const saveCartToStorage = () => {
  localStorage.setItem('cart', JSON.stringify(cart.value))
  localStorage.setItem('cartTotal', cartTotal.value.toString())
}

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem('cart')
  if (savedCart) {
    cart.value = JSON.parse(savedCart)
  }
}

const checkout = () => {
  // Save cart total for success page
  localStorage.setItem('cartTotal', cartTotal.value.toString())

  // Redirect to success page
  router.push({
    name: 'CheckoutSuccess',
    query: {
      total: cartTotal.value,
      transactionId: 'TRX' + Date.now().toString().slice(-8)
    }
  })
}

const logout = () => {
  localStorage.clear()
  router.push('/')
}

// Lifecycle
onMounted(() => {
  fetchItems()
  loadCartFromStorage()
})
</script>
