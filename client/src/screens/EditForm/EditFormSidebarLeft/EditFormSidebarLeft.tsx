import { Typography, List, ListItem, ListItemText, IconButton, ListItemButton, Grid, Box, ListItemAvatar } from '@mui/material';
import { NewEmptyQuestion, QuestionDTO } from '../../../types/question';
import {AddCircleRounded, Clear} from '@mui/icons-material';
import { QuestionType } from '../../../types/questionEnum';
import {ShortText, Checklist} from '@mui/icons-material';
import { themeConstants } from '../../../styles/theme.constants';
import { useEditFormState } from '../../../providers/formState';
import { FormDTO } from '../../../types/form';
import { truncateTextWithDot } from '../../../utils/string.utils';

interface EditFormSidebarLeftProps {
    questions?: QuestionDTO[];
    setQuestionIndex: (questionIndex: number) => void;
    questionIndex: number | undefined;
}

const QuestionAvatarIcon = ({icon, index, color}: {icon: any, index: number, color: string }) => {
    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: themeConstants.spacing.minDemi,
            p: themeConstants.spacing.minDemi,
            backgroundColor: color,
            borderRadius: '10%',
        }}>
            {icon}
            <Typography variant='body1' >
                {index +1}
            </Typography>
        </Box>
    )
};


const displayAvatarItem = (type: QuestionType, index: number) => {
    switch (type) {
        case QuestionType.TEXT:
            return <QuestionAvatarIcon icon={<ShortText />} index={index} color={themeConstants.colors.questionTypes.shortText} />;
        case QuestionType.SELECT:
            return <QuestionAvatarIcon icon={<Checklist />} index={index} color={themeConstants.colors.questionTypes.multipleChoice} />;
        default:
            return <QuestionAvatarIcon icon={<ShortText />} index={index} color={themeConstants.colors.questionTypes.shortText} />;
    }
};

const EditFormSidebarLeft = ({questions, setQuestionIndex, questionIndex}: EditFormSidebarLeftProps) => {
    const {setFormContext} = useEditFormState();
    
    const handleClick = (questionIndex: number) => {
        setQuestionIndex(questionIndex);
    };

    //TODO replace type by a variable type (depends on user selected type in a future dropdown select)
    const handleAddQuestion = () => {
        setFormContext((form) => {
            if(!form) return;
            console.log("formContext ===> ", form);
            const createQuestionInput: NewEmptyQuestion = {
                title: 'Nouvelle question',
                description: '',
                type: QuestionType.TEXT,
                formId: form.formId,
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
                ...form,
                questions: [...form.questions, createQuestionInput]
            } as FormDTO;
        });
    }

    const handleDeleteQuestion = (questionIndex: number) => {
        setFormContext((form) => {
            if(!form || form.questions !== undefined) return;
            return {
                ...form,
                questions: questions?.map((question, index) => {
                    if (index === questionIndex) {
                        return {
                            ...question,
                            deleted: true
                        };
                    }
                    return question;
                })
            } as FormDTO;
        });
    }

    return (
        <Grid item xs={3} sx={{backgroundColor: themeConstants.colors.white, border: themeConstants.border.base}}>
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
                        disablePadding
                        secondaryAction={
                            <IconButton 
                                edge="end" 
                                aria-label="supprimer"
                                onClick={() => handleDeleteQuestion(index)}
                            >
                              <Clear />
                            </IconButton>
                          }
                        sx={{backgroundColor: questionIndex === index ? themeConstants.colors.semiLightGrey : themeConstants.colors.white}}
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
                                {displayAvatarItem(QuestionType.SELECT, index)}
                            </ListItemAvatar>
                            <ListItemText primary={truncateTextWithDot(title)}/>                           
                        </ListItemButton>
                    </ListItem>)
                ))}
            </List>
      </Grid>
    )
}



export default EditFormSidebarLeft;

