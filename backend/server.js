import express from 'express';
import path from 'path';
import colors from 'colors';

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import farmerProductRoutes from './routes/farmerProductRoutes.js';
import farmerRoutes from './routes/farmerRoutes.js';
import userRoutes from './routes/userRoutes.js';
import shippingAddressRoutes from './routes/shippingAddressRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

connectDB();
const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/farmer-products', farmerProductRoutes);
app.use('/api/farmers', farmerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shipping-address', shippingAddressRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(
    'AZAqLauSbmgzhX0WKBuQDFYsRerUbcbomrdXCWbVAAkFqEFwkZePtXQOe9bymrJCiDpPce-R2BjhRXlv'
  )
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(express.static(path.join(__dirname, '/frontend/build')));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
);

app.use(notFound);
app.use(errorHandler);

const PORT = 5000;
app.listen(
  PORT,
  console.log(`Server running in production mode on port ${PORT}`.yellow.bold)
);
