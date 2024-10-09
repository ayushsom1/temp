const express = require('express');
const router = express.Router();

let purchaseOrders = [
  { id: 1, reference: 'PO0001', date: '2023-05-01', vendor: 'Vendor A', total: 5651.10, status: 'Confirmed' },
  { id: 2, reference: 'PO0002', date: '2023-05-02', vendor: 'Vendor B', total: 210000.00, status: 'Pending' },
];

router.get('/', (req, res) => {
  res.json(purchaseOrders);
});

router.post('/', (req, res) => {
  const newPurchaseOrder = {
    id: purchaseOrders.length + 1,
    reference: `PO000${purchaseOrders.length + 1}`,
    ...req.body,
    status: 'Pending',
  };
  purchaseOrders.push(newPurchaseOrder);
  res.status(201).json(newPurchaseOrder);
});

module.exports = router;