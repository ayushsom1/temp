const express = require('express');
const cors = require('cors');
const purchaseOrdersRouter = require('./routes/purchaseOrders');
const productsRouter = require('./routes/products');
const vendorsRouter = require('./routes/vendors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/purchase-orders', purchaseOrdersRouter);
app.use('/api/products', productsRouter);
app.use('/api/vendors', vendorsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});