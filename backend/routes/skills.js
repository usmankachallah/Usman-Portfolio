const express = require('express');
const { pool } = require('../server');
const router = express.Router();

// GET - Fetch All Skills
router.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    const [skills] = await connection.execute(
      'SELECT id, category, name, proficiency FROM skills ORDER BY category, name'
    );
    
    connection.release();

    // Group skills by category
    const groupedSkills = {};
    skills.forEach(skill => {
      if (!groupedSkills[skill.category]) {
        groupedSkills[skill.category] = [];
      }
      groupedSkills[skill.category].push({
        id: skill.id,
        name: skill.name,
        proficiency: skill.proficiency
      });
    });

    res.status(200).json({ 
      success: true, 
      data: groupedSkills 
    });
  } catch (error) {
    console.error('Fetch skills error:', error);
    res.status(500).json({ error: 'Failed to fetch skills', details: error.message });
  }
});

// POST - Add Skill (Admin)
router.post('/', async (req, res) => {
  try {
    const { category, name, proficiency } = req.body;

    if (!category || !name || !proficiency) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const connection = await pool.getConnection();
    
    const query = 'INSERT INTO skills (category, name, proficiency) VALUES (?, ?, ?)';
    const [result] = await connection.execute(query, [category, name, proficiency]);
    
    connection.release();

    res.status(201).json({ 
      success: true, 
      message: 'Skill added successfully!',
      data: { id: result.insertId, category, name, proficiency }
    });
  } catch (error) {
    console.error('Add skill error:', error);
    res.status(500).json({ error: 'Failed to add skill', details: error.message });
  }
});

module.exports = router;
