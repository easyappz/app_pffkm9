import React from 'react';
import { Grid, Button } from '@mui/material';

const buttons = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', 'C', '+',
  '='
];

const CalculatorLayout = ({ onNumberClick, onOperationClick, onCalculate, onClear }) => {
  const handleClick = (btn) => {
    if (btn === 'C') {
      onClear();
    } else if (btn === '=') {
      onCalculate();
    } else if (['+', '-', '*', '/'].includes(btn)) {
      onOperationClick(btn);
    } else {
      onNumberClick(btn);
    }
  };

  return (
    <Grid container spacing={1} sx={{ padding: 1 }}>
      {buttons.map((btn) => (
        <Grid item xs={3} key={btn}>
          <Button
            variant={btn === '=' ? 'contained' : 'outlined'}
            color={['+', '-', '*', '/'].includes(btn) ? 'secondary' : btn === '=' ? 'primary' : 'default'}
            fullWidth
            sx={{ height: 60, fontSize: '1.2rem' }}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default CalculatorLayout;
