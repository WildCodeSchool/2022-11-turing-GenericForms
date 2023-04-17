import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useContext } from 'react';
import { useEditFormState } from '../../../providers/formState';
import { QuestionDTO } from '../../../types/question';
import { FormContext } from './Questions';

interface Props {
    question: QuestionDTO;
};

const SelectType = ({question}: Props) => {
    const { activeStepIndex } = useContext<any>(FormContext);

  return (
    <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
        <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
    </FormGroup>
  )
}

export default SelectType;