const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Add Student
router.post('/students', async (req, res) => {
  const { name, image, age, status } = req.body;
  try {
    const student = new Student({ name, image, age, status });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Student
router.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, image, age, status } = req.body;
  try {
    const student = await Student.findByIdAndUpdate(id, { name, image, age, status }, { new: true });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Student
router.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Student.findByIdAndDelete(id);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;