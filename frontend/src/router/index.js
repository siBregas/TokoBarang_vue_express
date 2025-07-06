import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AdminView from '../views/AdminView.vue'
import UserView from '../views/UserView.vue'
import HomeView from '../views/HomeView.vue'
import AddItemView from '../views/AddItemView.vue'
import EditItemView from '../views/EditItemView.vue'
import AdminDashboard from '../views/AdminDashboard.vue'
import CheckoutSuccessView from '../views/CheckoutSuccessView.vue'
import { authGuard, adminGuard, userGuard, guestGuard } from './guards.js'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView,
    beforeEnter: guestGuard
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    beforeEnter: guestGuard
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    beforeEnter: userGuard
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    beforeEnter: adminGuard
  },
  {
    path: '/admin/add',
    name: 'AddItem',
    component: AddItemView,
    beforeEnter: adminGuard
  },
  {
    path: '/admin/edit/:id',
    name: 'EditItem',
    component: EditItemView,
    beforeEnter: adminGuard
  },
  {
    path: '/admin/users',
    name: 'AdminUsers',
    component: UserView,
    beforeEnter: adminGuard
  },
  {
    path: '/admin/history',
    name: 'AdminHistory',
    component: () => import('../views/HistoryView.vue'),
    beforeEnter: adminGuard
  },
  {
    path: '/checkout-success',
    name: 'CheckoutSuccess',
    component: CheckoutSuccessView,
    beforeEnter: userGuard
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
