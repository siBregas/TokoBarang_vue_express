// Auth guard untuk melindungi routes
export const authGuard = (to, from, next) => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    // Jika tidak ada token, redirect ke login
    next('/')
    return
  }
  
  // Jika ada token, lanjutkan
  next()
}

// Admin guard untuk melindungi routes admin
export const adminGuard = (to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  
  if (!token) {
    // Jika tidak ada token, redirect ke login
    next('/')
    return
  }
  
  if (role !== 'admin') {
    // Jika bukan admin, redirect ke halaman user
    next('/home')
    return
  }
  
  // Jika admin, lanjutkan
  next()
}

// User guard untuk melindungi routes user
export const userGuard = (to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  
  if (!token) {
    // Jika tidak ada token, redirect ke login
    next('/')
    return
  }
  
  if (role === 'admin') {
    // Jika admin, redirect ke halaman admin
    next('/admin')
    return
  }
  
  // Jika user biasa, lanjutkan
  next()
}

// Guest guard untuk halaman login/register
export const guestGuard = (to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  
  if (token) {
    // Jika sudah login, redirect sesuai role
    if (role === 'admin') {
      next('/admin')
    } else {
      next('/home')
    }
    return
  }
  
  // Jika belum login, lanjutkan ke halaman guest
  next()
}
