<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <AdminSidebar />

    <!-- Main Content -->
    <div class="ml-64">
      <!-- Top Navigation -->
      <AdminNavbar />

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '../components/AdminSidebar.vue'
import AdminNavbar from '../components/AdminNavbar.vue'
</script>
