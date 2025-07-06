const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    console.log('Fetched items:', items.length);
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ 
      error: 'Gagal mengambil data barang',
      details: error.message 
    });
  }
});

// Add new item
router.post('/', async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body
  const newItem = await prisma.item.create({
    data: { name, description, price, stock, imageUrl }
  })
  res.json(newItem)
})

// Get item by ID
router.get('/:id', async (req, res) => {
  const item = await prisma.item.findUnique({
    where: { id: parseInt(req.params.id) }
  })
  res.json(item)
})

// Update item
router.put('/:id', async (req, res) => {
  const { name, description, price, stock, imageUrl } = req.body
  const updated = await prisma.item.update({
    where: { id: parseInt(req.params.id) },
    data: { name, description, price, stock, imageUrl }
  })
  res.json(updated)
})

// Delete item
router.delete('/:id', async (req, res) => {
  await prisma.item.delete({
    where: { id: parseInt(req.params.id) }
  })
  res.json({ message: 'Deleted' })
})

module.exports = router