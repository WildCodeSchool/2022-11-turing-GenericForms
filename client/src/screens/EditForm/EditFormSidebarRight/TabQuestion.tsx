import React from 'react';
import { QuestionDTO } from '../../../types/question';
import { Typography, Box, Switch, TextField } from '@mui/material';
import { themeConstants } from '../../../styles/theme.constants';
import SelectListDrop from '../../../components/common/SelectListDrop';
import { SelectItem } from '../../../types/common';
import { FormDTO } from '../../../types/form';

interface TabQuestionProps {
    question: QuestionDTO;
    setFormContext: any;
}

const menuItemsArray: SelectItem[] = [
  {value: 0, label: 'Texte'},
  {value: 1, label: 'Choix multiples'},
  {value: 2, label: 'Nombre'},
];

function TabQuestion({question, setFormContext}: TabQuestionProps) {

  const handleChangeRequired = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean ) => {
    setFormContext((formContext: FormDTO) => {
      return {
        ...formContext,
        questions: formContext.questions.map((questionCtx: QuestionDTO) => questionCtx.questionId === question.questionId ? {...question, validation: {...question.validation, required: checked}} : questionCtx)
      }
    });
  };

  const handleChangeHasTextMin = (e: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setFormContext((formContext: FormDTO) => {
      return {
        ...formContext,
        questions: formContext.questions.map((questionCtx: QuestionDTO) => questionCtx.questionId === question.questionId ? {...question, validation: {...question.validation, textCharMin: checked ? 0 : null}} : questionCtx)
      }
    });
  };

  const handleChangeLength = (length: string) => {
    setFormContext((formContext: FormDTO) => {
      return {
        ...formContext,
        questions: formContext.questions.map((questionCtx: QuestionDTO) => questionCtx.questionId === question.questionId ? {...question, validation: {...question.validation, textCharMin: Number(length)}} : questionCtx)
      }
    });
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
              checked={question.validation.required}
              onChange={(e, checked) => handleChangeRequired(e, checked)}
          />
        </Box>
        <Box sx={styles.tabContent} >
          <Typography variant='body1'>Caractères minimum</Typography>
          <Switch 
              color='info' 
              checked={question.validation.textCharMin !== null ? true : false}
              onChange={(e, checked) => handleChangeHasTextMin(e, checked)}
          />
        </Box>
        <Box sx={styles.tabContent} >
          {question.validation.textCharMin !== null && (<TextField
            id="outlined-number"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            size='small'
            value={question.validation.textCharMin}
            onChange={e => handleChangeLength(e.target.value)}
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