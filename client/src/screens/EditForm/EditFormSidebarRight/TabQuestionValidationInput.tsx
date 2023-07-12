
import React from 'react'
import { Typography, Box, Switch, TextField } from '@mui/material';
import { QuestionDTO } from '../../../types/question';
import { themeConstants } from '../../../styles/theme.constants';
import { ValidationDTOFields } from '../../../types/validation';
import { DEFAULT_TEXT_CHAR_MIN } from '../../../helpers/constants';
import { useEditFormState } from '../../../providers/formState';

interface TabQuestionValidationInputProps {
    question: QuestionDTO;
    fieldName: ValidationDTOFields;
    fieldDescription: string;
}

function TabQuestionValidationInput({question, fieldName, fieldDescription}: TabQuestionValidationInputProps) {
  const {setFormContext} = useEditFormState();

  const handleChangeTextValidation = ({e, checked}: {
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement >,
    checked?: boolean | string,
  }) => {
    if(checked !== undefined) {
    setFormContext((form) => {
      if(!form) return;
      return {
        ...form,
        questions: form.questions.map((questionCtx: QuestionDTO) => questionCtx.questionId === question.questionId ? {...question, validation: {...question.validation, [fieldName]: checked ? DEFAULT_TEXT_CHAR_MIN : null}} : questionCtx)
      }
    });
    } else {
      setFormContext((form) => {
          if(!form) return;
          return {
            ...form,
            questions: form.questions.map((questionCtx: QuestionDTO) => questionCtx.questionId === question.questionId ? {...question, validation: {...question.validation, [fieldName]: Number(e.target.value)}} : questionCtx)
          }
        });
    }
  };

  return (
    <Box>
      <Box sx={styles.tabContent} >
          <Typography variant='body1'>{fieldDescription}</Typography>
          <Switch 
              color='info' 
              checked={question.validation[fieldName] !== null ? true : false}
              onChange={(e, checked) => handleChangeTextValidation({e, checked})}
          />
      </Box>
      {question.validation[fieldName] !== null && (
          <Box sx={styles.tabContent} >
              <TextField
                  name={fieldName}
                  id="outlined-number"
                  type="number"
                  InputLabelProps={{
                      shrink: true,
                  }}
                  variant="outlined"
                  size='small'
                  value={question.validation[fieldName]}
                  onChange={e => handleChangeTextValidation({e})}
                  />
          </Box>
      )}
    </Box>
  )
}

const styles = {
    tabContent: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: themeConstants.spacing.quarterSm,
      marginTop: themeConstants.spacing.min,
    },
  };
  

export default TabQuestionValidationInput