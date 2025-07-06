<template>
  <div class="success-container">
    <div class="success-card">
      <div class="success-icon">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
          <path class="checkmark-check" fill="none" d="m14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
      </div>

      <h1 class="success-title">Pembayaran Berhasil!</h1>

      <div class="success-details">
        <p class="success-message">
          Terima kasih atas pembelian Anda. Transaksi telah berhasil diproses.
        </p>

        <div class="transaction-info">
          <div class="info-item">
            <span class="label">ID Transaksi:</span>
            <span class="value">#{{ transactionId }}</span>
          </div>
          <div class="info-item">
            <span class="label">Total Pembayaran:</span>
            <span class="value">Rp {{ formatCurrency(totalAmount) }}</span>
          </div>
          <div class="info-item">
            <span class="label">Tanggal:</span>
            <span class="value">{{ currentDate }}</span>
          </div>
        </div>
      </div>

      <button @click="goToHome" class="finish-btn">
        Selesai
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const transactionId = ref('')
const totalAmount = ref(0)
const currentDate = ref('')

onMounted(() => {
  // Get transaction details from route params or localStorage
  transactionId.value = route.query.transactionId || generateTransactionId()
  totalAmount.value = route.query.total || localStorage.getItem('cartTotal') || 0
  currentDate.value = new Date().toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Clear cart from localStorage
  localStorage.removeItem('cart')
  localStorage.removeItem('cartTotal')
})

const generateTransactionId = () => {
  return 'TRX' + Date.now().toString().slice(-8)
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID').format(amount)
}

const goToHome = () => {
  router.push('/home')
}
</script>

<style scoped>
.success-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
}

.success-card {
  background: white;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.success-icon {
  margin-bottom: 2rem;
}

.checkmark {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  animation: checkmark-animation 0.6s ease-in-out;
}

.checkmark-circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4caf50;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.checkmark-check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  stroke-width: 3;
  stroke: #4caf50;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes checkmark-animation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.success-title {
  color: #4caf50;
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.success-details {
  margin-bottom: 2rem;
}

.success-message {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.transaction-info {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  text-align: left;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e9ecef;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  color: #666;
  font-weight: 500;
}

.value {
  color: #333;
  font-weight: 600;
}

.finish-btn {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 150px;
}

.finish-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

.finish-btn:active {
  transform: translateY(0);
}
</style>
