const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();

async function testDatabase() {
  console.log('🔍 Testing database connection...');
  
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    // Test items query
    const items = await prisma.item.findMany();
    console.log(`✅ Found ${items.length} items in database`);
    
    if (items.length > 0) {
      console.log('📦 Sample item:', items[0]);
    } else {
      console.log('⚠️  No items found in database');
    }
    
  } catch (error) {
    console.error('❌ Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

async function testAPI() {
  console.log('\n🔍 Testing API endpoints...');
  
  try {
    // Test base API
    const baseRes = await axios.get('http://localhost:5000/');
    console.log('✅ Base API:', baseRes.data);
    
    // Test items API
    const itemsRes = await axios.get('http://localhost:5000/api/items');
    console.log(`✅ Items API: Found ${itemsRes.data.length} items`);
    
    if (itemsRes.data.length > 0) {
      console.log('📦 Sample item from API:', itemsRes.data[0]);
    }
    
  } catch (error) {
    console.error('❌ API error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

async function runTests() {
  console.log('🚀 Starting comprehensive tests...\n');
  
  await testDatabase();
  await testAPI();
  
  console.log('\n✨ Tests completed!');
}

runTests();
