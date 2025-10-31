const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log(err));

// Routes
app.use('/api/contacts', require('./server/routes/contactRoutes'));
app.use('/api/projects', require('./server/routes/projectRoutes'));
app.use('/api/qualifications', require('./server/routes/qualificationRoutes'));
app.use('/api/users', require('./server/routes/userRoutes'));
app.use('/api/auth', require('./server/routes/authRoutes'));

app.get('/', (req, res) => {
  res.send('Portfolio API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});