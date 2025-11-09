require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('./server/config/db.config');
const authController = require('./server/controllers/auth.controller');

const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// MongoDB Connection
const dbUri = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;
mongoose.connect(dbUri)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    authController.createAdminUser(); // Create admin user if not exists
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit();
  });

// Routes
app.use('/api/auth', require('./server/routes/auth.routes'));
app.use('/api/contacts', require('./server/routes/contact.routes'));
app.use('/api/education', require('./server/routes/education.routes'));
app.use('/api/projects', require('./server/routes/project.routes'));

app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

// Error handling middleware (optional, but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});