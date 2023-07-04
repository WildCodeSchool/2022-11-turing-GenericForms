import React from 'react';
import { QuestionDTO } from '../../../types/question';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import TabPanel from './TabPanel';
import TabQuestionSettings from './TabQuestion';
import TabFormSettings from './TabForm';

interface EditFormSidebarRightProps {
    question: QuestionDTO;
    questionIndex: number | undefined;
    setFormContext: any;
}

//accessibility props for tabs
function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function EditFormSidebarRight({question, questionIndex, setFormContext}: EditFormSidebarRightProps) {
    const [tabIndex, setTabIndex] = React.useState(0);
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    
  return (
    <Box sx={{minHeight: '92vh'}}>
        <Tabs 
            value={tabIndex}
            onChange={handleChangeTab}
            aria-label="menu customisation questions et formulaire"
            variant='fullWidth'
        >
            <Tab label={questionIndex !== undefined ? 'Question #' + `${questionIndex+1}` : 'Aucune Question sélectionnée'} {...a11yProps(0)} />
            <Tab label="Formulaire" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
            <TabQuestionSettings question={question} setFormContext={setFormContext} questionIndex={questionIndex} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
            <TabFormSettings />
        </TabPanel>
    </Box>
  )
}

export default EditFormSidebarRight;