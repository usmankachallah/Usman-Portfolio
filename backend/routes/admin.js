const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../server');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const connection = await pool.getConnection();
    const [admin] = await connection.execute(
      'SELECT * FROM admin_users WHERE email = ?',
      [email]
    );
    connection.release();

    if (admin.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, admin[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: admin[0].id, email: admin[0].email, name: admin[0].name },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin[0].id,
        name: admin[0].name,
        email: admin[0].email,
        title: admin[0].title,
        avatar_url: admin[0].avatar_url
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get Admin Profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [admin] = await connection.execute(
      'SELECT id, name, email, title, bio, phone, location, avatar_url, created_at FROM admin_users WHERE id = ?',
      [req.admin.id]
    );
    connection.release();

    if (admin.length === 0) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json({ admin: admin[0] });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Update Admin Profile
router.put('/profile', verifyToken, async (req, res) => {
  const { name, title, bio, phone, location, avatar_url } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const connection = await pool.getConnection();
    await connection.execute(
      'UPDATE admin_users SET name = ?, title = ?, bio = ?, phone = ?, location = ?, avatar_url = ? WHERE id = ?',
      [name, title || null, bio || null, phone || null, location || null, avatar_url || null, req.admin.id]
    );
    connection.release();

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Change Password
router.put('/change-password', verifyToken, async (req, res) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  // Validation
  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: 'New passwords do not match' });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  }

  try {
    const connection = await pool.getConnection();
    const [admin] = await connection.execute(
      'SELECT password FROM admin_users WHERE id = ?',
      [req.admin.id]
    );

    if (admin.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Admin not found' });
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(currentPassword, admin[0].password);
    if (!isPasswordValid) {
      connection.release();
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    await connection.execute(
      'UPDATE admin_users SET password = ? WHERE id = ?',
      [hashedPassword, req.admin.id]
    );
    connection.release();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Get all contacts with optional filtering
router.get('/contacts', verifyToken, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const connection = await pool.getConnection();
    const [contacts] = await connection.execute(
      'SELECT * FROM contacts ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [parseInt(limit), offset]
    );

    const [countResult] = await connection.execute('SELECT COUNT(*) as total FROM contacts');
    connection.release();

    res.status(200).json({
      contacts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: countResult[0].total,
        pages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

// Delete contact message
router.delete('/contacts/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'DELETE FROM contacts WHERE id = ?',
      [id]
    );
    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
});

module.exports = router;
