import { Typography, List, ListItem, ListItemText, IconButton, ListItemButton, Grid, Box, ListItemAvatar } from '@mui/material';
import { CreateQuestionInput, NewEmptyQuestion, QuestionDTO } from '../../../types/question';
import {AddCircleRounded, Clear} from '@mui/icons-material';
import { FormDTO } from '../../../types/form';
import { QuestionType } from '../../../types/questionEnum';
import ShortTextIcon from '@mui/icons-material/ShortText';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import { themeConstants } from '../../../styles/theme.constants';
import { useEditFormState } from '../../../providers/formState';


interface EditFormSidebarLeftProps {
    questions?: QuestionDTO[];
    setQuestionIndex: (questionIndex: number) => void;
}

const EditFormSidebarLeft = ({questions, setQuestionIndex}: EditFormSidebarLeftProps) => {
    const [formContext, setFormContext] = useEditFormState();
    
    const handleClick = (questionIndex: number) => {
        setQuestionIndex(questionIndex);
    };

    //TODO replace type by a variable type (depends on user selected type in a future dropdown select)
    const handleAddQuestion = () => {
        setFormContext((formContext: FormDTO) => {
            console.log("formContext ===> ", formContext);
            const createQuestionInput: NewEmptyQuestion = {
                title: 'Nouvelle question',
                description: '',
                type: QuestionType.TEXT,
                formId: formContext.formId,
                choices: [],
                validation: {
                    required: false,
                    textCharMin: null,
                    textCharMax: null,
                    multipleChoiceMin: null,
                    multipleChoiceMax: null,
                },
            };
            return {
                ...formContext,
                questions: [...formContext.questions, createQuestionInput]
            }
        });
    }

    const handleDeleteQuestion = (questionIndex: number) => {
        setFormContext((formContext: FormDTO) => {            
            return {
                ...formContext,
                questions: questions?.map((question, index) => {
                    if (index === questionIndex) {
                        return {
                            ...question,
                            deleted: true
                        };
                    }
                    return question;
                })
            }
        });
    }

    return (
        <Grid item xs={2} sx={{backgroundColor: themeConstants.colors.white, border: themeConstants.border.base}}>
            <Box sx={{display: 'flex'}} my={themeConstants.spacing.quarterSm} >
                <IconButton onClick={handleAddQuestion} sx={{margin: '0 auto'}}>
                    <AddCircleRounded />
                </IconButton>
            </Box>
            <List>
                {questions?.length === 0 && <Typography variant='body1' sx={{textAlign: 'center'}}>Vite, créer votre première question !</Typography>}
                {questions && handleClick && questions.map(({title, type, deleted}, index) => (
                    !deleted &&
                    (<ListItem 
                        key={index} 
                        disablePadding sx={{ display: 'block' }}
                        secondaryAction={
                            <IconButton 
                                edge="end" 
                                aria-label="supprimer"
                                onClick={() => handleDeleteQuestion(index)}
                            >
                              <Clear />
                            </IconButton>
                          }
                    >
                        <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: 'initial',
                            px: 2.5,
                        }}
                        onClick={() => handleClick(index)}
                        >
                            <ListItemAvatar
                                sx={{
                                minWidth: 0,
                                mr: 3,
                                justifyContent: 'center',
                                }}
                            >
                                {type === QuestionType.TEXT ? <ShortTextIcon /> : <PlusOneIcon />}
                            </ListItemAvatar>
                            <ListItemText primary={title} />
                        </ListItemButton>
                    </ListItem>)
                ))}
            </List>
      </Grid>
    )
}



export default EditFormSidebarLeft;

