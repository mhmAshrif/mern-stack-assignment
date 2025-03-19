const express = require('express');
const Student = require('../models/Student');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Protect all routes with authMiddleware
router.use(authMiddleware);

// Add Student
router.post('/', async (req, res) => {
  const { name, image, age, status } = req.body;
  try {
    const student = new Student({ name, image, age, status });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Student
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, image, age, status } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { name, image, age, status },
      { new: true } // Return the updated student
    );
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Student
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const student = await Student.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;