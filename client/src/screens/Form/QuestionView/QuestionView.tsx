import { ListItem, ListItemText } from "@mui/material";
import React from "react";
import { QuestionDTO } from "../../../types/question";

interface QuestionViewProps {
    question: QuestionDTO;
};

const QuestionView = ({question}: QuestionViewProps) => {
    return (
        <ListItem>
            <ListItemText>{question.title}</ListItemText>
        </ListItem>
    )
};

export default QuestionView;