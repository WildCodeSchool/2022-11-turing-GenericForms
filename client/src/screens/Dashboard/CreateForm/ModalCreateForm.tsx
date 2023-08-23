import React, { FormEvent, useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { CREATE_FORM } from '../../../services/forms.mutation';
import { useMutation } from '@apollo/client';

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
}

const ModalCreateForm = ({ open, onClose }: ModalFormProps) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [name, setName] = useState('');
  const [createFormMutation] = useMutation(CREATE_FORM);

  // Temp value for userId and themeId
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log('Name: ', name)
    console.log('Selected Category: ', selectedOption)
    try {
      await createFormMutation({
        variables: {
          createFormInput: {
            title: name,
            userId: 1,
            themeId: 1,
            category: selectedOption,
            visibility: false,
          },
        },
      });
      console.log('Form created');
    } catch (error) {
      console.log(error);
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 12,
          borderRadius: 2,
          p: 2,
        }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <TextField
              label="Nom du formulaire"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal" />
            <Select
              id="category-select"
              label="Catégorie"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <MenuItem value="option1">Option 1</MenuItem>
              <MenuItem value="option2">Option 2</MenuItem>
              <MenuItem value="option3">Option 3</MenuItem>
            </Select>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                margin: 2
              }}>
              Créer
            </Button>
          </FormControl>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalCreateForm;
