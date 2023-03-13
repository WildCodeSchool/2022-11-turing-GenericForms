import { Grid, IconButton, List, ListItem, TextField } from '@mui/material';
import React from 'react';
import { FormDTO } from '../../types/form';
import { QuestionDTO } from '../../types/question';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';


interface SelectQuestionPreviewProps {
    question: QuestionDTO; //? provient du FormContext
    setFormContext: any;
};

const SelectQuestionPreview = ({question, setFormContext}: SelectQuestionPreviewProps) => {
    const [choiceValue, setChoiceValue] = React.useState<string>("");
    
    //TODO add a debouncer wrapper to avoid too many calls to the server
    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormContext((formContext: FormDTO) => {
            return {
                ...formContext,
                questions: formContext.questions.map((questionCtx) => questionCtx.questionId === question.questionId ? {...question, title: event.target.value} : questionCtx)
            }
        });
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormContext((formContext: FormDTO) => {
            return {
                ...formContext,
                questions: formContext.questions.map((questionCtx) => questionCtx.questionId === question.questionId ? {...question, description: event.target.value} : questionCtx)
            }
        });
    };

    const handleAddChoice = () => {
        console.log("add choice with text: ", choiceValue);
    };

    const handleRemoveChoice = () => {
        console.log("remove choice");
    };

    const handleChangeNewChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChoiceValue(event.target.value);
    };



    return (
        <Grid container direction={'column'}>
            <Grid item xs={12}>
                <TextField id="standard-basic" variant="standard" value={question.title} onChange={handleChangeTitle} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="standard-basic" variant="standard" value={question.description} onChange={handleChangeDescription} />
            </Grid>
            <Grid item xs={12}>
                <List key={question.questionId}>
                {question.choices.length === 0 && 
                    <ListItem key="no-choice">
                        <TextField id="standard-basic" variant="standard" placeholder='Choix 1'/>
                    </ListItem>
                }
                {question.choices && question.choices.map((choice, index) => {
                    return (
                        <ListItem>
                            <TextField id="standard-basic" variant="standard" value={choice.text} key={choice.text+index}/>
                            <IconButton onClick={handleRemoveChoice}>
                                <RemoveCircleRoundedIcon />
                            </IconButton>
                        </ListItem>
                    )
                })
                }
                    {/*TODO complete the feature to add a choice */}
                    <ListItem key={"add-choice"} >
                        <IconButton onClick={handleAddChoice}>
                            <AddCircleRoundedIcon />
                        </IconButton>
                        <TextField 
                                id="standard-basic" 
                                variant="standard" 
                                value={choiceValue} 
                                placeholder={"Ajouter un choix"}
                                onChange={handleChangeNewChoice}
                        />
                    </ListItem>
                 </List>
            </Grid>
        </Grid>
    )
};

export default SelectQuestionPreview;