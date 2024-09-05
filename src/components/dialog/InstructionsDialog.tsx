import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogProps from './DialogProps';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import styling from './Dialog.module.css';

const InstructionsDialog: React.FC<DialogProps> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth={'sm'}>
      <div className={styling.wrapper}>
        <div className={styling.header}>
          <h2>How To Play</h2>
          <IconButton onClick={() => handleClose()}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className={styling.body}>
          <p>Try to find the hidden calculation in 6 guesses!</p>
          <p>
            After each guess, the color of the tiles will change to show
            how close you are to the solution.
          </p>
          <ul>
            <li>Green are in the correct place.</li>
            <li>Yellow are in the solution, but in a different place.</li>
            <li>Gray are not in the solution.</li>
          </ul>

          <h3>Additional Rules</h3>

          <ul>
            <li>Numbers and operators can appear multiple times.</li>
            <li>Calculate / or * before - or + (order of operations).</li>
            <li>
              Commutative solutions are accepted, for example 20+7+3 and
              3+7+20.
            </li>
            <li>
              Commutative solutions will be automatically rearranged to the
              exact solution.
            </li>
          </ul>
        </div>
      </div>
    </Dialog>
  );
};

export default InstructionsDialog;
