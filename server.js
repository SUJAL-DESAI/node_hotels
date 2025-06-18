const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); // Your database connection
const menu = require('./models/MenuItem.js'); // Your Mongoose model

const app = express();
const port = 3000;

// ✅ Apply CORS FIRST — this is crucial
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// ✅ Use bodyParser after CORS
app.use(bodyParser.json());

// ✅ Optional logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 🔹 Test route
app.get('/hi', (req, res) => {
  res.send('Welcome to the hotel!');
});




// 🔹 Import the router files
const personRoutes = require('./Routes/PersonRoutes');
const menuItemRoutes = require('./Routes/MenuItemRoutes');

// 🔹 Use the person routes
app.use('/Person', personRoutes);

// 🔹 Use the menu item routes
app.use('/Menu', menuItemRoutes);

// 🔹 Start server
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
