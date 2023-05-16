import React from 'react';
import { QuestionDTO } from '../../../types/question';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import TabPanel from './TabPanel';
import TabQuestionSettings from './TabQuestionSettings';
import TabFormStyleSettings from './TabFormStyleSettings';

interface EditFormSidebarRightProps {
    question: QuestionDTO; //? provient du FormContext
}

//accessibility props for tabs
function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function EditFormSidebarRight({question}: EditFormSidebarRightProps) {
    const [tabIndex, setTabIndex] = React.useState(0);
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };
  return (
    <Box sx={{minHeight: '92vh'}}>
        <Tabs 
            value={tabIndex}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
            variant='fullWidth'
        >
            <Tab label="Question" {...a11yProps(0)} />
            <Tab label="Style" {...a11yProps(1)} />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
            <TabQuestionSettings question={question} />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
            <TabFormStyleSettings />
        </TabPanel>
    </Box>
  )
}

export default EditFormSidebarRight;