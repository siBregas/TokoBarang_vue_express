<template>
  <aside class="w-64 h-screen bg-gray-800 text-white fixed top-0 left-0 flex flex-col">
    <div class="text-2xl font-bold p-4 border-b border-gray-700">
      🛒 TokoAdmin
    </div>
    <nav class="flex-1">
      <ul class="p-2 space-y-2">
        <li>
          <router-link 
            to="/admin" 
            class="block p-2 hover:bg-gray-700 rounded"
            active-class="bg-gray-600"
            exact
          >
            📦 Barang
          </router-link>
        </li>
        <li>
          <router-link 
            to="/admin/users" 
            class="block p-2 hover:bg-gray-700 rounded"
            active-class="bg-gray-600"
          >
            👤 User
          </router-link>
        </li>
        <li>
          <router-link 
            to="/admin/history" 
            class="block p-2 hover:bg-gray-700 rounded"
            active-class="bg-gray-600"
          >
            🧾 Riwayat
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AdminSidebar'
}
</script>
