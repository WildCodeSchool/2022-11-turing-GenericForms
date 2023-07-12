import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { useContext } from 'react';
import { QuestionDTO } from '../../../../types/question';
import { FormContext } from '../Questions';

interface Props {
    question: QuestionDTO;
}

const SelectType = ({question}: Props) => {
    const { activeStepIndex } = useContext<FormContext>(FormContext);

  return (
    <div style={{margin: 'auto'}}>
    <FormGroup>
        <FormControlLabel control={<Checkbox defaultChecked />} label="choice 1" />
        <FormControlLabel control={<Checkbox />} label="choice 2" />
    </FormGroup>
    </div>
  )
}

export default SelectType;