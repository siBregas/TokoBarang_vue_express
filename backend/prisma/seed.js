const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('admin123', 10);

  // Create admin user
  await prisma.user.upsert({
    where: { email: 'admin@toko.com' },
    update: {},
    create: {
      name: 'Administrator',
      email: 'admin@toko.com',
      password: hashed,
      role: 'admin'
    }
  });

  // Create sample items
  const items = [
    {
      name: 'Laptop Dell XPS 13',
      description: 'Laptop premium dengan performa tinggi dan desain tipis',
      price: 15000000,
      stock: 5,
      imageUrl: 'https://via.placeholder.com/300x200?text=Laptop+Dell'
    },
    {
      name: 'iPhone 15 Pro',
      description: 'Smartphone terbaru dengan teknologi canggih',
      price: 18000000,
      stock: 8,
      imageUrl: 'https://via.placeholder.com/300x200?text=iPhone+15'
    },
    {
      name: 'Samsung Galaxy S24',
      description: 'Android flagship dengan kamera berkualitas tinggi',
      price: 12000000,
      stock: 12,
      imageUrl: 'https://via.placeholder.com/300x200?text=Samsung+S24'
    },
    {
      name: 'MacBook Air M3',
      description: 'Laptop Apple dengan chip M3 yang powerful',
      price: 20000000,
      stock: 3,
      imageUrl: 'https://via.placeholder.com/300x200?text=MacBook+Air'
    },
    {
      name: 'iPad Pro 12.9"',
      description: 'Tablet profesional untuk kreativitas dan produktivitas',
      price: 16000000,
      stock: 7,
      imageUrl: 'https://via.placeholder.com/300x200?text=iPad+Pro'
    },
    {
      name: 'AirPods Pro 2',
      description: 'Earbuds wireless dengan noise cancellation',
      price: 3500000,
      stock: 15,
      imageUrl: 'https://via.placeholder.com/300x200?text=AirPods+Pro'
    }
  ];

  // Delete existing items first (optional, untuk development)
  await prisma.item.deleteMany({});
  
  // Create all items
  await prisma.item.createMany({
    data: items,
    skipDuplicates: true
  });

  console.log('✅ Admin user created!');
  console.log(`✅ ${items.length} sample items created!`);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());