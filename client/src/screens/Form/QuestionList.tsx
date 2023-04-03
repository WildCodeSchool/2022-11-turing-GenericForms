import { List, ListItem, ListItemText, Typography } from "@mui/material";
import React from "react";
import { QuestionDTO } from "../../types/question";
import QuestionView from "./QuestionView/QuestionView";

interface QuestionListProps {
    questions: QuestionDTO[];
};

const QuestionList = ({questions}: QuestionListProps) => {
    
    questions === undefined && <Typography>Ce questionnaire ne comporte aucune question :/</Typography>;
    return (
        <List>
            {   
                questions?.map((question: QuestionDTO, index: number) => {
                    return (
                        <QuestionView question={question} key={index} />
                    )
                }
            )}
            <ListItem>
                <ListItemText>Add a question</ListItemText>
            </ListItem>
        </List>
    )
};

export default QuestionList;