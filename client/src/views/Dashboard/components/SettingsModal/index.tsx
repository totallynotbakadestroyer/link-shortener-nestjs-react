import { Dialog, DialogTitle } from '@material-ui/core';
import React from 'react';

import SettingsForm from './components/SettingsForm';

const SettingsModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}): JSX.Element => (
  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">Settings</DialogTitle>
    <SettingsForm handleClose={handleClose} />
  </Dialog>
);

export default SettingsModal;
