const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 5000;
const SECRET = process.env.SECRET; // move to env later

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // your React app
  credentials: true
}));

// Dummy user
const user = {
  id: 1,
  email: 'test@example.com',
  password: bcrypt.hashSync('password123', 10) // hash password
};

// Login route
app.post('/', (req, res) => {
  const { email, password } = req.body;

  if (email !== user.email) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1d' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // set to true on production (HTTPS)
    sameSite: 'strict'
  }).json({ message: 'Logged in successfully' });
});

// Profile route
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const userData = jwt.verify(token, SECRET);
    res.json({ message: 'Success', user: userData });
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Logout
app.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
