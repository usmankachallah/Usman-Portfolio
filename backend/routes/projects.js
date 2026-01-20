const express = require('express');
const { pool } = require('../server');
const router = express.Router();

// GET - Fetch All Projects
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    const [projects] = await connection.execute(
      'SELECT id, title, description, technologies, link, icon, created_at FROM projects ORDER BY created_at DESC'
    );
    
    connection.release();

    res.status(200).json({ 
      success: true, 
      count: projects.length,
      data: projects 
    });
  } catch (error) {
    console.error('Fetch projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects', details: error.message });
  }
});

// GET - Fetch Single Project
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    
    const [projects] = await connection.execute(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );
    
    connection.release();

    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.status(200).json({ success: true, data: projects[0] });
  } catch (error) {
    console.error('Fetch project error:', error);
    res.status(500).json({ error: 'Failed to fetch project', details: error.message });
  }
});

// POST - Create Project (Admin)
router.post('/', async (req, res) => {
  try {
    const { title, description, technologies, link, icon } = req.body;

    if (!title || !description || !technologies) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const connection = await pool.getConnection();
    
    const query = 'INSERT INTO projects (title, description, technologies, link, icon, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
    const [result] = await connection.execute(query, [title, description, technologies, link || '#', icon || '📁']);
    
    connection.release();

    res.status(201).json({ 
      success: true, 
      message: 'Project created successfully!',
      data: { id: result.insertId, title, description }
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project', details: error.message });
  }
});

module.exports = router;
