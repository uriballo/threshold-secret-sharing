import SplitSecret from './components/SplitSecret';
import './App.css';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import ReconstructSecret from './components/ReconstructSecret';

function App() {
  /**
   * Controls the selected mode, ['split','build'].
   */
  const [mode, setMode] = useState('split');

  /**
   * Changes the selected mode to newMode.
   */
  const handleChange = (event: React.MouseEvent<HTMLElement>, newMode: string) => {
    setMode(newMode);
  }

  return (
    <div className="App">
      <ToggleButtonGroup sx={{ my: 3 }}
        color="primary"
        value={mode}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="split">Split</ToggleButton>
        <ToggleButton value="build">Build</ToggleButton>
      </ToggleButtonGroup>
      {mode === 'split'
        ? <SplitSecret />
        : <ReconstructSecret />}

    </div>
  );
}

export default App;