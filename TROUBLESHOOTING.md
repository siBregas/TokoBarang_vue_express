# 🔧 Troubleshooting Guide - Data Barang Tidak Muncul

## ⚠️ Masalah Umum & Solusi

### 1. **Backend Server Tidak Berjalan**
```bash
# Periksa apakah backend berjalan
curl http://localhost:5000

# Jika tidak berjalan, start backend:
cd backend
npm run dev
```

### 2. **Database Tidak Terkonfigurasi**
```bash
# Periksa dan setup database
cd backend

# Pastikan .env ada dengan DATABASE_URL
# Jalankan migrasi
npx prisma migrate dev

# Seed data sample
npx prisma db seed
```

### 3. **CORS Error**
- Pastikan frontend berjalan di port 5173
- Backend sudah include CORS untuk localhost:5173

### 4. **Test Koneksi Database & API**
```bash
# Jalankan test script
cd backend
node test-api.js
```

## 🚀 Langkah Setup Lengkap

### Backend Setup:
```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Frontend Setup:
```bash
cd frontend  
npm install
npm run dev
```

## 🔍 Debug Steps

1. **Buka Browser Dev Tools (F12)**
2. **Periksa Console untuk error JavaScript**
3. **Periksa Network tab untuk API calls**
4. **Pastikan API call ke `http://localhost:5000/api/items` berhasil (status 200)**

## 📊 Expected API Response
```json
[
  {
    "id": 1,
    "name": "Laptop Gaming ASUS ROG",
    "description": "Laptop gaming dengan performa tinggi",
    "price": 15000000,
    "stock": 5,
    "imageUrl": "https://example.com/laptop.jpg"
  }
]
```

## 🎯 Quick Fix Commands

**Jika masih ada masalah, jalankan perintah ini:**

```bash
# Reset dan setup ulang backend
cd backend
rm -rf node_modules
npm install
npx prisma migrate reset --force
npx prisma db seed
npm run dev

# Reset frontend  
cd frontend
rm -rf node_modules
npm install
npm run dev
```

## 📱 Tampilan Fixed

✅ **HomeView**: Grid responsif (1-4 kolom), sidebar cart lebih compact
✅ **AdminDashboard**: Responsive table + mobile cards  
✅ **Error Handling**: Better error messages dengan troubleshooting info
✅ **Layout**: Optimized untuk semua ukuran layar
