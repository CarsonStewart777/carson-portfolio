// Make sure dotenv is at the very top
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression'); // Import compression middleware
const dbConfig = require('./server/config/db.config');
const { createAdminUser } = require('./server/controllers/auth.controller');

const app = express();

// Enable CORS for all origins - for development purposes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Enable Gzip compression for all responses
app.use(compression());

// --- DIAGNOSTIC LOGGER ---
// This will log details for every incoming request.
app.use((req, res, next) => {
  console.log(`--- NEW REQUEST: ${req.method} ${req.path} ---`);
  console.log('Request Body:', req.body);
  console.log('Content-Type Header:', req.headers['content-type']);
  next();
});

// --- MongoDB Connection ---
// Use DB_URI from .env, with a fallback to the config file
const dbUri = process.env.DB_URI || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

mongoose
  .connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    // Create the admin user if it doesn't exist
    createAdminUser();
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit with failure code
  });

// --- API Routes ---
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running...' });
});

app.use('/api/auth', require('./server/routes/auth.routes'));
app.use('/api/users', require('./server/routes/user.routes'));
app.use('/api/projects', require('./server/routes/project.routes'));
app.use('/api/education', require('./server/routes/education.routes'));
app.use('/api/contact', require('./server/routes/contact.routes'));


// --- Global Error Handling Middleware ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: err.message || 'Something broke!' });
});

// --- Server Startup ---
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
