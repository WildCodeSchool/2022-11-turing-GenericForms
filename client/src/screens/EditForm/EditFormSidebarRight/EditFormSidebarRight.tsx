import React from 'react';
import { QuestionDTO } from '../../../types/question';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import TabPanel from './TabPanel';

interface EditFormSidebarRightProps {
    question: QuestionDTO; //? provient du FormContext
    setFormContext: any;
}

function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function EditFormSidebarRight({question, setFormContext}: EditFormSidebarRightProps) {
    const [tabIndex, setTabIndex] = React.useState(0);
    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };
  return (
    <Box sx={{minHeight: '92vh'}}>
        <Box>
        <Tabs value={tabIndex} onChange={handleChangeTab} aria-label="basic tabs example">
          <Tab label="Question" {...a11yProps(0)} />
          <Tab label="Style" {...a11yProps(1)} />
        </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
            Question
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
            Style
        </TabPanel>
    </Box>
  )
}

export default EditFormSidebarRight;