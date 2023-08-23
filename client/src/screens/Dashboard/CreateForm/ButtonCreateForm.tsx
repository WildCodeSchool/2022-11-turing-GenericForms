import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ModalCreateForm from './ModalCreateForm';

const ButtonCreateForm = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
      + Créer un formulaire
      </Button>
      <ModalCreateForm open={open} onClose={handleClose} />
    </div>
  );
};

export default ButtonCreateForm;
