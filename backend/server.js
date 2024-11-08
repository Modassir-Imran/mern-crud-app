const express = require('express');
const app = express();
const cors = require('cors');
const recordRoutes = require('./routes/recordRoutes');
require('dotenv').config();
const connectDB = require('./config/db');

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow only frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());
connectDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Server is running' });
});

// Routes
app.use('/api/records', recordRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 6000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});