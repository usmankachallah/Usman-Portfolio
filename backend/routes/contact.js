const express = require('express');
const { pool } = require('../server');
const validator = require('validator');
const router = express.Router();

// POST - Submit Contact Form
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (message.length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters' });
    }

    const connection = await pool.getConnection();
    
    const query = 'INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, NOW())';
    await connection.execute(query, [name, email, message]);
    
    connection.release();

    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully!',
      data: { name, email }
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({ error: 'Failed to submit contact form', details: error.message });
  }
});

// GET - Fetch All Messages (Admin Only)
router.get('/messages', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    const [messages] = await connection.execute(
      'SELECT id, name, email, message, created_at FROM contacts ORDER BY created_at DESC'
    );
    
    connection.release();

    res.status(200).json({ 
      success: true, 
      count: messages.length,
      data: messages 
    });
  } catch (error) {
    console.error('Fetch messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages', details: error.message });
  }
});

module.exports = router;
