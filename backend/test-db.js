const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...');
    
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test if we can run a simple query
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database query test passed!');
    
    // Check if items exist
    const itemCount = await prisma.item.count();
    console.log(`📦 Items in database: ${itemCount}`);
    
    if (itemCount === 0) {
      console.log('⚠️  No items found. Running seed...');
      
      // Run seed directly
      const bcrypt = require('bcryptjs');
      const hashed = await bcrypt.hash('admin123', 10);

      // Create admin user
      await prisma.user.upsert({
        where: { email: 'admin@toko.com' },
        update: {},
        create: {
          email: 'admin@toko.com',
          password: hashed,
          role: 'admin'
        }
      });

      // Create sample items
      const items = [
        {
          name: 'Laptop Dell XPS 13',
          price: 15000000,
          stock: 5,
          imageUrl: 'https://via.placeholder.com/300x200?text=Laptop+Dell'
        },
        {
          name: 'iPhone 15 Pro',
          price: 18000000,
          stock: 8,
          imageUrl: 'https://via.placeholder.com/300x200?text=iPhone+15'
        },
        {
          name: 'Samsung Galaxy S24',
          price: 12000000,
          stock: 12,
          imageUrl: 'https://via.placeholder.com/300x200?text=Samsung+S24'
        }
      ];

      await prisma.item.createMany({
        data: items,
        skipDuplicates: true
      });

      console.log('✅ Seed data created successfully!');
      
    } else {
      const items = await prisma.item.findMany();
      console.log('📋 Sample items:');
      items.forEach(item => {
        console.log(`   - ${item.name}: Rp${item.price.toLocaleString('id-ID')} (Stock: ${item.stock})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
