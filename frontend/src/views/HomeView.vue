<template>
  <div class="min-h-screen bg-gray-300 flex flex-col w-full overflow-x-hidden">
    <!-- Header - Fullscreen -->
    <header class="bg-gray-900 shadow-lg sticky top-0 z-40 flex-shrink-0 w-full">
      <div class="px-4 sm:px-6 w-full">
        <div class="flex justify-between items-center h-16">
          <h1 class="text-2xl font-bold text-white">🛒 Toko Barang</h1>
          <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors">
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex-1 flex min-h-0">
      <!-- Product List - Takes full width on mobile, adjusts on larger screens -->
      <div class="flex-1 px-4 sm:px-6 py-6 min-w-0 overflow-hidden">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Daftar Barang</h2>
          <button @click="fetchItems" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm">
            🔄 Refresh
          </button>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
          <div v-for="n in 14" :key="n" class="bg-white rounded-lg shadow-md p-4 animate-pulse">
            <div class="h-48 bg-gray-200 rounded mb-4"></div>
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-6xl mb-4">⚠️</div>
          <p class="text-red-600 mb-4 text-lg font-semibold">{{ error }}</p>
          <button @click="fetchItems" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors">
            Coba Lagi
          </button>
        </div>        <!-- Products Grid -->
        <div v-else-if="!loading && !error" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4">
          <div v-for="item in items" :key="item.id" class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <!-- Product Image -->
            <div class="h-40 sm:h-44 lg:h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
              <img v-if="item.imageUrl" :src="item.imageUrl" :alt="item.name" class="w-full h-full object-cover">
              <div v-else class="text-gray-400 text-4xl">📦</div>
            </div>

            <!-- Product Info -->
            <div class="p-3 sm:p-4">
              <h3 class="font-bold text-lg sm:text-xl mb-2 line-clamp-2 text-gray-900">{{ item.name }}</h3>
              <p v-if="item.description" class="text-gray-700 text-sm sm:text-base mb-3 line-clamp-2 font-medium">{{ item.description }}</p>
              <div class="flex items-center justify-between mb-3 sm:mb-4">
                <span class="text-xl sm:text-2xl font-bold text-green-600">{{ formatCurrency(item.price) }}</span>
              </div>

              <!-- Stock Info - Moved above quantity controls -->
              <div class="text-center mb-3">
                <span class="text-sm font-semibold text-gray-700 bg-gray-200 px-3 py-1 rounded-full">
                  Stok: {{ item.stock }}
                </span>
              </div>

              <!-- Quantity Controls -->
              <div class="space-y-2 sm:space-y-3">
                <div class="flex items-center justify-center">
                  <div class="flex items-center border-2 border-gray-400 rounded-lg bg-white shadow-md">
                    <button
                      @click="decreaseQuantity(item.id)"
                      :disabled="getItemQuantity(item.id) <= 0"
                      class="px-3 sm:px-4 py-2 sm:py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-lg transition-colors text-white font-bold"
                    >
                      <span class="text-lg sm:text-xl">-</span>
                    </button>
                    <input
                      :value="getItemQuantity(item.id)"
                      @input="updateQuantity(item.id, $event.target.value)"
                      type="number"
                      min="0"
                      :max="item.stock"
                      class="w-16 sm:w-20 px-2 sm:px-3 py-2 sm:py-3 text-center border-x-0 focus:outline-none bg-white font-bold text-lg sm:text-xl text-gray-900"
                    >
                    <button
                      @click="increaseQuantity(item.id)"
                      :disabled="getItemQuantity(item.id) >= item.stock"
                      class="px-3 sm:px-4 py-2 sm:py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed rounded-r-lg transition-colors text-white font-bold"
                    >
                      <span class="text-lg sm:text-xl">+</span>
                    </button>
                  </div>
                </div>

                <div v-if="getItemQuantity(item.id) > 0" class="text-center bg-green-100 p-3 rounded-lg border-2 border-green-300">
                  <div class="text-sm sm:text-base text-gray-700 font-semibold">Total:</div>
                  <div class="font-bold text-green-700 text-lg sm:text-xl">
                    {{ formatCurrency(item.price * getItemQuantity(item.id)) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State inside grid -->
          <div v-if="items.length === 0" class="col-span-full text-center py-16">
            <div class="text-8xl mb-6">📦</div>
            <h3 class="text-2xl font-semibold text-gray-700 mb-3">Belum ada barang</h3>
            <p class="text-gray-600 text-lg">Barang akan ditampilkan di sini setelah admin menambahkannya</p>
          </div>
        </div>
      </div>

      <!-- Shopping Cart Sidebar - Fixed on desktop, modal on mobile -->
      <div class="hidden lg:block lg:w-80 xl:w-80 2xl:w-80 flex-shrink-0">
        <div class="sticky top-20 mx-3">
          <div class="bg-white rounded-lg shadow-xl border-2 border-gray-300 p-4 max-h-[calc(100vh-6rem)] flex flex-col">
            <h3 class="text-lg font-bold mb-4 flex items-center border-b pb-3 text-gray-800">
              🛒 Keranjang Belanja
              <span v-if="cartCount > 0" class="ml-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full font-bold">
                {{ cartCount }}
              </span>
            </h3>

            <!-- Cart Items -->
            <div class="flex-1 overflow-hidden">
              <div v-if="cartItems.length === 0" class="text-center py-12 text-gray-600">
                <div class="text-6xl mb-4">🛒</div>
                <p class="text-lg font-semibold">Keranjang kosong</p>
                <p class="text-sm">Tambahkan barang untuk mulai berbelanja</p>
              </div>

              <div v-else class="space-y-3 max-h-80 overflow-y-auto pr-2">
                <div v-for="cartItem in cartItems" :key="cartItem.id" class="flex items-start gap-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300">
                  <div class="w-10 h-10 bg-gray-300 rounded flex items-center justify-center flex-shrink-0">
                    <img v-if="cartItem.imageUrl" :src="cartItem.imageUrl" :alt="cartItem.name" class="w-full h-full object-cover rounded">
                    <span v-else class="text-gray-500 text-sm">📦</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-sm line-clamp-1 text-gray-800">{{ cartItem.name }}</h4>
                    <p class="text-xs text-gray-700 mb-1">{{ formatCurrency(cartItem.price) }} x {{ cartItem.quantity }}</p>
                    <p class="font-bold text-green-600 text-sm">{{ formatCurrency(cartItem.price * cartItem.quantity) }}</p>
                  </div>
                  <button @click="removeFromCart(cartItem.id)" class="text-red-600 hover:text-red-800 p-1 hover:bg-red-100 rounded transition-colors font-bold">
                    <span class="text-lg">×</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Cart Total -->
            <div v-if="cartItems.length > 0" class="border-t pt-4 mt-4">
              <div class="flex justify-between items-center mb-4">
                <span class="font-bold text-gray-800">Total Pembayaran:</span>
                <span class="text-xl font-bold text-green-600">{{ formatCurrency(cartTotal) }}</span>
              </div>

              <button
                @click="checkout"
                :disabled="cartItems.length === 0"
                class="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                💳 Bayar Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Cart Button -->
    <div class="lg:hidden fixed bottom-4 right-4 z-50">
      <button
        @click="showMobileCart = true"
        class="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        🛒
        <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {{ cartCount }}
        </span>
      </button>
    </div>

    <!-- Mobile Cart Modal -->
    <div v-if="showMobileCart" class="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end" @click="showMobileCart = false">
      <div class="bg-white w-full max-h-[80vh] rounded-t-2xl p-6 transform transition-transform" @click.stop>
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-gray-800">🛒 Keranjang Belanja</h3>
          <button @click="showMobileCart = false" class="text-2xl text-gray-600 font-bold">×</button>
        </div>

        <div v-if="cartItems.length === 0" class="text-center py-8 text-gray-600">
          <div class="text-4xl mb-2">🛒</div>
          <p class="font-semibold">Keranjang kosong</p>
        </div>

        <div v-else>
          <div class="space-y-3 mb-6 max-h-60 overflow-y-auto">
            <div v-for="cartItem in cartItems" :key="cartItem.id" class="flex items-center gap-3 p-3 bg-gray-100 rounded-lg border border-gray-300">
              <div class="w-12 h-12 bg-gray-300 rounded flex items-center justify-center">
                <img v-if="cartItem.imageUrl" :src="cartItem.imageUrl" :alt="cartItem.name" class="w-full h-full object-cover rounded">
                <span v-else class="text-gray-500">📦</span>
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-sm text-gray-800">{{ cartItem.name }}</h4>
                <p class="text-xs text-gray-700">{{ formatCurrency(cartItem.price) }} x {{ cartItem.quantity }}</p>
                <p class="font-semibold text-green-600">{{ formatCurrency(cartItem.price * cartItem.quantity) }}</p>
              </div>
              <button @click="removeFromCart(cartItem.id)" class="text-red-500 hover:text-red-700 p-2">
                ×
              </button>
            </div>
          </div>

          <div class="border-t pt-4">
            <div class="flex justify-between items-center mb-4">
              <span class="text-lg font-semibold">Total:</span>
              <span class="text-xl font-bold text-green-600">{{ formatCurrency(cartTotal) }}</span>
            </div>

            <button
              @click="checkout"
              class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Bayar Sekarang
            </button>
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
const showMobileCart = ref(false)

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
  } catch (err) {
    if (err.code === 'ECONNREFUSED') {
      error.value = 'Tidak dapat terhubung ke server. Pastikan backend sudah berjalan di http://localhost:5000'
    } else if (err.response?.status === 404) {
      error.value = 'API endpoint tidak ditemukan. Periksa konfigurasi backend.'
    } else {
      error.value = 'Gagal memuat data barang: ' + (err.response?.data?.error || err.message)
    }
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
  // Close mobile cart modal if open
  showMobileCart.value = false

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

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
