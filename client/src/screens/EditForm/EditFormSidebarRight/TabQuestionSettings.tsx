import React from 'react';
import { QuestionDTO } from '../../../types/question';
import { Typography, Box } from '@mui/material';
import { themeConstants } from '../../../styles/theme.constants';
import SelectListDrop from '../../../components/common/SelectListDrop';
import { SelectItem } from '../../../types/common';

interface TabQuestionProps {
    question: QuestionDTO;
};

//TODO get all themes from graphQL query and map them to menuItemsArray
const menuItemsArray: SelectItem[] = [
  {value: 0, label: 'Texte'},
  {value: 1, label: 'Choix multiples'},
  {value: 2, label: 'Nombre'},
];

function TabQuestion({question}: TabQuestionProps) {

  return (
    <Box>
      <Box sx={styles.tab}>
        <Typography variant='h6' sx={styles.tabTitle}>Type</Typography>
        <SelectListDrop menuItems={menuItemsArray} />
      </Box>
      <Box sx={styles.tab}>
        <Typography variant='h6' sx={styles.tabTitle}>Paramètres</Typography>
        <Typography variant='body1'>{question.title}</Typography>
      </Box>
    </Box>
  )
};

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
};


export default TabQuestion;