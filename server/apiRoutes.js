const express = require('express');

const router = express.Router();

// MongoDB model for calculation history
const Calculation = global.CalculationModel;

// GET /api/hello
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from API!' });
});

// GET /api/status
router.get('/status', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// POST /api/calculate/add - Addition
router.post('/calculate/add', async (req, res) => {
  try {
    const { operand1, operand2 } = req.body;
    if (typeof operand1 !== 'number' || typeof operand2 !== 'number') {
      return res.status(400).json({ error: 'Invalid input: operands must be numbers' });
    }
    const result = operand1 + operand2;
    const calculation = new Calculation({
      operation: 'add',
      operand1,
      operand2,
      result
    });
    await calculation.save();
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Server error during addition' });
  }
});

// POST /api/calculate/subtract - Subtraction
router.post('/calculate/subtract', async (req, res) => {
  try {
    const { operand1, operand2 } = req.body;
    if (typeof operand1 !== 'number' || typeof operand2 !== 'number') {
      return res.status(400).json({ error: 'Invalid input: operands must be numbers' });
    }
    const result = operand1 - operand2;
    const calculation = new Calculation({
      operation: 'subtract',
      operand1,
      operand2,
      result
    });
    await calculation.save();
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Server error during subtraction' });
  }
});

// POST /api/calculate/multiply - Multiplication
router.post('/calculate/multiply', async (req, res) => {
  try {
    const { operand1, operand2 } = req.body;
    if (typeof operand1 !== 'number' || typeof operand2 !== 'number') {
      return res.status(400).json({ error: 'Invalid input: operands must be numbers' });
    }
    const result = operand1 * operand2;
    const calculation = new Calculation({
      operation: 'multiply',
      operand1,
      operand2,
      result
    });
    await calculation.save();
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Server error during multiplication' });
  }
});

// POST /api/calculate/divide - Division
router.post('/calculate/divide', async (req, res) => {
  try {
    const { operand1, operand2 } = req.body;
    if (typeof operand1 !== 'number' || typeof operand2 !== 'number') {
      return res.status(400).json({ error: 'Invalid input: operands must be numbers' });
    }
    if (operand2 === 0) {
      return res.status(400).json({ error: 'Division by zero is not allowed' });
    }
    const result = operand1 / operand2;
    const calculation = new Calculation({
      operation: 'divide',
      operand1,
      operand2,
      result
    });
    await calculation.save();
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Server error during division' });
  }
});

// GET /api/calculate/history - Get calculation history
router.get('/calculate/history', async (req, res) => {
  try {
    const history = await Calculation.find().sort({ timestamp: -1 }).limit(10);
    res.json({ history });
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching history' });
  }
});

module.exports = router;
