const express = require('express');
const router = express.Router();

let vendors = [
  { id: 1, name: 'Vendor A', email: 'vendora@example.com', phone: '1234567890' },
  { id: 2, name: 'Vendor B', email: 'vendorb@example.com', phone: '0987654321' },
];

router.get('/', (req, res) => {
  res.json(vendors);
});

router.post('/', (req, res) => {
  const newVendor = { id: vendors.length + 1, ...req.body };
  vendors.push(newVendor);
  res.status(201).json(newVendor);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = vendors.findIndex(v => v.id === id);
  if (index !== -1) {
    vendors[index] = { ...vendors[index], ...req.body };
    res.json(vendors[index]);
  } else {
    res.status(404).json({ message: 'Vendor not found' });
  }
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = vendors.findIndex(v => v.id === id);
  if (index !== -1) {
    vendors.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Vendor not found' });
  }
});

module.exports = router;