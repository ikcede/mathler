'use client';

import React from 'react';
import styling from './GameControls.module.css';
import { IconButton } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import InstructionsDialog from '@/components/dialog/InstructionsDialog';

const GameControls: React.FC = () => {
  const [instructionsOpen, setInstructionsOpen] = React.useState(false);

  return (
    <div className={styling.wrapper}>
      Game mode: Normal
      <IconButton
        aria-label="instructions"
        onClick={() => setInstructionsOpen(true)}
      >
        <HelpOutlineIcon />
      </IconButton>
      <InstructionsDialog
        open={instructionsOpen}
        onClose={() => setInstructionsOpen(false)}
      />
    </div>
  );
};

export default GameControls;
