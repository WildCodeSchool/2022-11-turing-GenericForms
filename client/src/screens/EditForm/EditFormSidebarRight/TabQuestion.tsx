import React, { useEffect } from 'react';
import { QuestionDTO } from '../../../types/question';
import { Typography, Box, Switch, TextField } from '@mui/material';
import { themeConstants } from '../../../styles/theme.constants';
import SelectListDrop from '../../../components/common/SelectListDrop';
import { SelectItem } from '../../../types/common';

interface TabQuestionProps {
    question: QuestionDTO;
}

const menuItemsArray: SelectItem[] = [
  {value: 0, label: 'Texte'},
  {value: 1, label: 'Choix multiples'},
  {value: 2, label: 'Nombre'},
];

function TabQuestion({question}: TabQuestionProps) {
  const [required, setRequired] = React.useState<boolean>(question.validation.required);
  const [minLength, setMinLength] = React.useState<number | undefined>(question.validation.textCharMin);
  const [hasTextMin, setHasTextMin] = React.useState<boolean>(question.validation.textCharMin !== undefined ? true : false);

  useEffect(() => {
    if(!hasTextMin) {
      setMinLength(undefined);
    }
  }, [hasTextMin]);

  //TODO change validation rule in question of Form Context
  const handleChangeRequired = () => {
    setRequired(!required);
  };

  const handleChangeHasTextMin = () => {
    setHasTextMin(!hasTextMin);
  };

  //TODO change validation rule in question of Form Context and delete local state
  const handleChangeLength = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMinLength(Number(e.target.value));
  };


  if(!question.questionId || !question.type) {
    <Box>
      <Box sx={styles.tab}>
        <Typography variant='h6' sx={styles.tabTitle}>Aucune question sélectionnée !</Typography>
      </Box>
    </Box>
  }

  return (
    <Box>
      <Box sx={styles.tab}>
        <Typography variant='h6' sx={styles.tabTitle}>Type</Typography>
        <SelectListDrop menuItems={menuItemsArray} />
      </Box>
      <Box sx={styles.tab}>
        <Typography variant='h6' sx={styles.tabTitle}>Paramètres</Typography>
        <Box sx={styles.tabContent} >
          <Typography variant='body1'>Réponse obligatoire</Typography>
          <Switch 
              color='info' 
              checked={required}
              onChange={handleChangeRequired}
          />
        </Box>
        <Box sx={styles.tabContent} >
          <Typography variant='body1'>Caractères minimum</Typography>
          <Switch 
              color='info' 
              checked={hasTextMin}
              onChange={handleChangeHasTextMin}
          />
        </Box>
        <Box sx={styles.tabContent} >
          {hasTextMin && (<TextField
            id="outlined-number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            size='small'
            value={minLength ? minLength : 0}
            onChange={handleChangeLength}
          />)}
        </Box>
      </Box>
    </Box>
  )
}

const styles = {
  tab: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: themeConstants.spacing.quarterSm,
    marginTop: themeConstants.spacing.min,
    marginBottom: themeConstants.spacing.quarter,
  },
  tabTitle: {
    fontWeight: 'bold',
    marginBottom: themeConstants.spacing.min,
  },
  tabContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: themeConstants.spacing.quarterSm,
    marginTop: themeConstants.spacing.min,
  },
};


export default TabQuestion;