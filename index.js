require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const { renderError } = require('./views/userView');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Health check route
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

// Routes
app.use('/users', userRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json(renderError({
        message: 'Route not found',
        status: 404
    }));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json(renderError(err));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

