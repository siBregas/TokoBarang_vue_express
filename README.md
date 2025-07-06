Ini hanya project coba2 mostly dikerjakan dengan AI karna dengan waktu yang singkat tidak cukup untuk memperlajari semua sekaligus penjelasan juga  hasil dari prompt jadi mohon maaf jika ada yang miss :)


# 🛒 Toko Barang - Vue.js + Express.js + Prisma

Aplikasi toko barang sederhana dengan fitur shopping cart untuk user dan dashboard admin untuk CRUD barang.

## 📋 Fitur

### 🔐 Autentikasi
- **Login**: Admin dan User
- **Register**: Hanya untuk User biasa
- **Admin**: Dibuat melalui seed database

### 👤 User (Customer)
- Melihat daftar barang yang tersedia
- Menambah/mengurangi jumlah barang di keranjang
- Input manual jumlah barang yang diinginkan
- Keranjang belanja dengan total harga
- Checkout dengan halaman konfirmasi pembayaran
- Logout

### 👨‍💼 Admin
- Dashboard manajemen barang (CRUD)
- Melihat dan mengelola user yang terdaftar
- Melihat riwayat transaksi
- Logout

## 🚀 Quick Setup Guide

### ⚠️ Prerequisites
Pastikan sudah terinstall:
- **Node.js** (v16 atau lebih baru)
- **MySQL** server (atau MariaDB)
- **Git** untuk clone repository

### 📥 1. Clone Repository
```bash
git clone <repository-url>
cd toko-barang_vue_express
```

### 🗄️ 2. Setup Database
```bash
# Buat database MySQL baru
mysql -u root -p
CREATE DATABASE toko_barang;
exit;
```

### 🔧 3. Setup Backend
```bash
# Masuk ke folder backend
cd backend

# Install dependencies
npm install

# Buat file .env (WAJIB!)
# Copy dari .env.example atau buat manual:
```

**Buat file `.env` di folder `backend/` dengan isi:**
```env
DATABASE_URL="mysql://root:password@localhost:3306/toko_barang"
PORT=5000
JWT_SECRET="your-secret-key-here"
```
*⚠️ Ganti `password` dengan password MySQL Anda*

```bash
# Generate Prisma client
npx prisma generate

# Jalankan migrasi database
npx prisma migrate dev

# Seed database (buat admin dan sample barang)
npx prisma db seed
```

### 🎨 4. Setup Frontend
```bash
# Buka terminal baru, masuk ke folder frontend
cd frontend

# Install dependencies
npm install
```

### ▶️ 5. Jalankan Aplikasi

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# ✅ Backend berjalan di: http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# ✅ Frontend berjalan di: http://localhost:5173
```

### 🌐 6. Akses Aplikasi
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🔑 Akun Demo

### 👨‍💼 Admin
- **Email**: `admin@toko.com`
- **Password**: `admin123`

### 👤 User
- Daftar melalui halaman register di: http://localhost:5173/register
- Atau gunakan form registrasi yang tersedia

## 🛠️ Troubleshooting

### ❌ Database Connection Error
```bash
# Pastikan MySQL berjalan
sudo service mysql start  # Linux
brew services start mysql # Mac
# Atau jalankan MySQL Workbench/XAMPP

# Periksa connection
mysql -u root -p
SHOW DATABASES;
```

### ❌ "prisma command not found"
```bash
# Install Prisma CLI global
npm install -g prisma

# Atau gunakan npx
npx prisma migrate dev
```

### ❌ Port sudah digunakan
```bash
# Cek port yang digunakan
netstat -tulpn | grep :5000  # Linux/Mac
netstat -ano | findstr :5000 # Windows

# Kill process jika perlu
kill -9 <PID>  # Linux/Mac
taskkill /PID <PID> /F  # Windows
```

### ❌ CORS Error
- Pastikan backend berjalan di port 5000
- Pastikan frontend berjalan di port 5173
- Restart kedua server jika masih error

### ❌ "Cannot find module" Error
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules package-lock.json  # Linux/Mac
rmdir /s node_modules & del package-lock.json  # Windows

npm install
```

## 📂 Struktur Project

```
toko-barang_vue_express/
├── 📁 backend/
│   ├── 📁 routes/
│   │   ├── auth.routes.js     # Login & Register API
│   │   ├── item.routes.js     # CRUD barang API
│   │   └── user.routes.js     # User management API
│   ├── 📁 prisma/
│   │   ├── schema.prisma      # Database schema
│   │   ├── seed.js           # Data awal (admin + sample)
│   │   └── 📁 migrations/    # Database migrations
│   ├── index.js              # Server utama
│   ├── package.json
│   └── .env                  # Database config (buat manual)
│
├── 📁 frontend/
│   ├── 📁 src/
│   │   ├── 📁 views/         # Halaman-halaman
│   │   ├── 📁 components/    # Komponen reusable
│   │   ├── 📁 router/        # Routing + guards
│   │   └── 📁 assets/        # CSS + static files
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

### Frontend (Vue.js)
```
src/
├── views/
│   ├── LoginView.vue          # 🔐 Halaman login
│   ├── RegisterView.vue       # 📝 Halaman register
│   ├── HomeView.vue          # 🏠 Shopping (user)
│   ├── AdminDashboard.vue    # 📊 Dashboard admin
│   ├── UserView.vue          # 👥 Kelola user (admin)
│   ├── HistoryView.vue       # 📋 Riwayat (admin)
│   ├── AddItemView.vue       # ➕ Tambah barang
│   ├── EditItemView.vue      # ✏️ Edit barang
│   └── CheckoutSuccessView.vue # ✅ Sukses bayar
├── components/
│   ├── AdminSidebar.vue      # Sidebar admin
│   └── AdminNavbar.vue       # Navbar admin
├── router/
│   ├── index.js              # Route definitions
│   └── guards.js             # Auth protection
└── layouts/
    └── AdminLayout.vue       # Layout admin pages
```

### Backend (Express.js + Prisma)
```
backend/
├── routes/
│   ├── auth.routes.js        # POST /login, /register
│   ├── item.routes.js        # GET,POST,PUT,DELETE /items
│   └── user.routes.js        # GET /users
├── prisma/
│   ├── schema.prisma         # User, Item models
│   └── seed.js              # npm run seed
└── index.js                 # Express server
```

## 🗄️ Database Schema

### User
- `id` (Primary Key, Auto Increment)
- `name` (String, optional)  
- `email` (String, unique, required)
- `password` (String, hashed dengan bcrypt)
- `role` (Enum: 'admin' | 'user', default: 'user')

### Item  
- `id` (Primary Key, Auto Increment)
- `name` (String, required)
- `description` (Text, optional)
- `price` (Integer, dalam Rupiah)
- `stock` (Integer, default: 0)
- `imageUrl` (String, optional)
- `createdAt` (DateTime, auto)
- `updatedAt` (DateTime, auto)

### Order & OrderItem (Future)
- Untuk menyimpan riwayat transaksi lengkap

## 🔧 Environment Setup

### Backend (.env file)
Buat file `.env` di folder `backend/`:
```env
# Database
DATABASE_URL="mysql://root:your_password@localhost:3306/toko_barang"

# Server  
PORT=5000

# JWT (optional, akan auto-generate jika kosong)
JWT_SECRET="your-super-secret-jwt-key-here"
```

**⚠️ PENTING**: Ganti `your_password` dengan password MySQL Anda!

### Database Commands
```bash
# Reset database (jika ada masalah)
npx prisma migrate reset

# Lihat data di database
npx prisma studio
# Akan buka di: http://localhost:5555

# Generate Prisma client setelah schema berubah
npx prisma generate
```

## 🎯 Quick Test

### 1. Test Backend API
```bash
# Test server
curl http://localhost:5000/api/items

# Atau buka di browser:
# http://localhost:5000/api/items
```

### 2. Test Login
- Buka: http://localhost:5173
- Login dengan: `admin@toko.com` / `admin123`
- Atau register user baru

## 📊 Tech Stack

**Frontend:**
- ⚡ **Vue 3** + Composition API
- 🛣️ **Vue Router** untuk routing + guards
- 🌐 **Axios** untuk HTTP requests  
- 🎨 **Tailwind CSS** untuk styling
- 📦 **Vite** untuk build tool

**Backend:**
- 🚀 **Express.js** untuk web server
- 🗄️ **Prisma ORM** untuk database
- 🔒 **bcryptjs** untuk password hashing
- 🎫 **jsonwebtoken** untuk JWT auth
- 🌍 **CORS** untuk cross-origin requests
- 🐬 **MySQL** untuk database

## 📝 Cara Penggunaan

### 🔐 Login Sebagai Admin
1. Buka http://localhost:5173
2. Login: `admin@toko.com` / `admin123`
3. Akses dashboard admin untuk kelola barang

### 🛒 Belanja Sebagai User  
1. Register user baru di halaman register
2. Login dengan akun user
3. Browse barang dan tambah ke keranjang
4. Checkout untuk menyelesaikan pembelian

### 👨‍💼 Kelola Barang (Admin)
1. Dashboard → "Kelola Barang"
2. Tambah/Edit/Hapus barang
3. Monitor stok dan harga

## 🛡️ Security

- Password di-hash menggunakan bcryptjs
- JWT token untuk autentikasi
- Route protection dengan guards
- Role-based access control

## 📦 Dependencies

### Frontend
- Vue 3 + Composition API
- Vue Router untuk routing
- Axios untuk HTTP requests
- Tailwind CSS untuk styling

### Backend
- Express.js untuk web server
- Prisma ORM untuk database
- bcryptjs untuk password hashing
- jsonwebtoken untuk JWT
- CORS untuk cross-origin requests

## 🔧 Environment Setup

### Backend (.env file)
Buat file `.env` di folder `backend/`:
```env
# Database
DATABASE_URL="mysql://root:your_password@localhost:3306/toko_barang"

# Server
PORT=5000

# JWT (optional, akan auto-generate jika kosong)
JWT_SECRET="your-super-secret-jwt-key-here"
```

**⚠️ PENTING**: Ganti `your_password` dengan password MySQL Anda!

### Database Commands
```bash
# Reset database (jika ada masalah)
npx prisma migrate reset

# Lihat data di database
npx prisma studio
# Akan buka di: http://localhost:5555

# Generate Prisma client setelah schema berubah
npx prisma generate
```

## 🎯 Quick Test

### 1. Test Backend API
```bash
# Test server
curl http://localhost:5000/api/items

# Atau buka di browser:
# http://localhost:5000/api/items
```

### 2. Test Login
- Buka: http://localhost:5173
- Login dengan: `admin@toko.com` / `admin123`
- Atau register user baru

## 📊 Tech Stack

## 📝 Cara Penggunaan

1. **Setup**: Jalankan migrasi dan seed database
2. **Login sebagai Admin**: Gunakan akun admin@toko.com
3. **Tambah Barang**: Melalui dashboard admin
4. **Register User**: Buat akun user baru
5. **Shopping**: Login sebagai user dan mulai berbelanja
6. **Checkout**: Proses pembayaran dan lihat halaman sukses

## 🚨 Common Issues & Solutions

### ❌ Database Connection Error  
```bash
# Pastikan MySQL berjalan
sudo service mysql start  # Linux
brew services start mysql # Mac
# Atau jalankan MySQL Workbench/XAMPP

# Buat database jika belum ada
mysql -u root -p
CREATE DATABASE toko_barang;
exit;
```

### ❌ "Access denied for user 'root'@'localhost'"
```bash
# Reset MySQL password
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'newpassword';
FLUSH PRIVILEGES;
exit;

# Update .env dengan password baru
```

### ❌ CORS Error
- Pastikan backend berjalan di port 5000
- Pastikan frontend berjalan di port 5173
- Restart kedua server jika masih error

### ❌ Build Error / "Cannot resolve dependency"
```bash
# Clear cache dan reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Migration failed"
```bash
# Reset dan migrate ulang
npx prisma migrate reset
npx prisma migrate dev
npx prisma db seed
```

### ❌ Port already in use
```bash
# Kill process di port yang digunakan
lsof -ti:5000 | xargs kill -9  # Mac/Linux
netstat -ano | findstr :5000   # Windows
taskkill /PID <PID> /F         # Windows
```

## 📈 Future Enhancements

- [ ] 💳 Payment gateway integration (Midtrans/Xendit)
- [ ] 📧 Email notifications untuk order
- [ ] 📱 Order history untuk user  
- [ ] 🖼️ Image upload untuk barang
- [ ] 🔍 Advanced search & filtering
- [ ] 📊 Sales analytics untuk admin
- [ ] 🧪 Unit testing (Jest/Vitest)
- [ ] 🐳 Docker containerization
- [ ] ☁️ Cloud deployment (Vercel + PlanetScale)

## 🛡️ Security Features

- ✅ Password hashing dengan bcrypt
- ✅ JWT token authentication  
- ✅ Route protection dengan guards
- ✅ Role-based access control (admin/user)
- ✅ CORS configuration
- ✅ Input validation

## 🚀 Production Deployment

### Environment Variables Production
```env
NODE_ENV=production
DATABASE_URL="mysql://user:pass@production-host:3306/toko_barang"
JWT_SECRET="your-very-strong-jwt-secret-for-production"
FRONTEND_URL="https://yourdomain.com"
```

### Build Commands
```bash
# Frontend build
cd frontend
npm run build

# Backend production
cd backend  
npm start
```

---

**📞 Need Help?**
- 🐛 Bug reports: Create an issue
- 💡 Feature requests: Create an issue  
- 📧 Questions: Contact via GitHub

**⭐ Star this repo if helpful!**
