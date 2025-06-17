import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import CalculatorLayout from './CalculatorLayout';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const handleNumberClick = (num) => {
    if (display === '0' && num !== '.') {
      setDisplay(num);
    } else {
      if (waitingForSecondOperand) {
        setDisplay(num);
        setWaitingForSecondOperand(false);
      } else {
        setDisplay(display + num);
      }
    }
  };

  const handleOperationClick = (op) => {
    setPrevValue(parseFloat(display));
    setOperation(op);
    setWaitingForSecondOperand(true);
  };

  const calculateResult = () => {
    if (!prevValue || !operation) return;

    const currentValue = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+':
        result = prevValue + currentValue;
        break;
      case '-':
        result = prevValue - currentValue;
        break;
      case '*':
        result = prevValue * currentValue;
        break;
      case '/':
        if (currentValue === 0) {
          setDisplay('Error');
          return;
        }
        result = prevValue / currentValue;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setPrevValue(null);
    setOperation(null);
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' }}>
      <Box sx={{ width: '100%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3, overflow: 'hidden' }}>
        <Typography variant="h4" align="center" sx={{ padding: 2, backgroundColor: '#1976d2', color: '#fff' }}>
          Calculator
        </Typography>
        <TextField
          variant="outlined"
          value={display}
          disabled
          fullWidth
          inputProps={{ style: { textAlign: 'right', fontSize: '2rem' } }}
          sx={{ padding: 1, backgroundColor: '#f9f9f9' }}
        />
        <CalculatorLayout
          onNumberClick={handleNumberClick}
          onOperationClick={handleOperationClick}
          onCalculate={calculateResult}
          onClear={handleClear}
        />
      </Box>
    </Box>
  );
};

export default Calculator;
