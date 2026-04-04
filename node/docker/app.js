require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

// ENV
const PORT = process.env.PORT;
if (!process.env.PORT){
    throw new Error('❌ PORT must be defined');
}

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Hardcoded URLs
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
const PHOTOS_URL = 'https://jsonplaceholder.typicode.com/photos';
const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// Home Route
app.get('/', (req, res) => {
    res.send('🚀 Node API App Running');
});

// TODOS endpoint
app.get('/todos', async (req, res) => {
    try {
        const response = await axios.get(TODOS_URL);
        res.json(response.data.slice(0, 10));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// PHOTOS endpoint
app.get('/photos', async (req, res) => {
    try {
        const response = await axios.get(PHOTOS_URL);
        res.json(response.data.slice(0, 10));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch photos' });
    }
});

// USERS endpoint
app.get('/users', async (req, res) => {
    try {
        const response = await axios.get(USERS_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});