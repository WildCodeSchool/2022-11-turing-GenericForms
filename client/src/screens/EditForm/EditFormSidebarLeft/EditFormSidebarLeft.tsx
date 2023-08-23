import { Typography, List, ListItem, ListItemText, IconButton, ListItemButton, Grid, Box, ListItemAvatar } from '@mui/material';
import { NewEmptyQuestion, QuestionDTO } from '../../../types/question';
import {AddCircleRounded, Clear} from '@mui/icons-material';
import { QuestionType } from '../../../types/questionEnum';
import {ShortText, Checklist, Add} from '@mui/icons-material';
import { themeConstants } from '../../../styles/theme.constants';
import { useEditFormState } from '../../../providers/formState';
import { FormDTO } from '../../../types/form';
import { truncateTextWithDot } from '../../../utils/string.utils';
import Popover from '../../../components/common/Popover';

interface EditFormSidebarLeftProps {
    questions?: QuestionDTO[];
    setQuestionIndex: (questionIndex: number) => void;
    questionIndex: number | undefined;
}

const QuestionAvatarIcon = ({icon, index, color}: {icon: any, index?: number, color: string }) => {
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
            {index !== undefined && <Typography variant='body1' sx={{fontSize: 16}}>{index +1}</Typography>}
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


    const popoverContent = (
        <Box sx={{ p: 1, maxWidth: "40vw" }}>
            <List>
                <ListItem disablePadding
                onClick={() => handleAddQuestion(QuestionType.TEXT)}
                >
                    <ListItemButton>
                        <QuestionAvatarIcon icon={<ShortText />} color={themeConstants.colors.questionTypes.shortText} />
                        <Typography variant='body1' sx={{justifySelf: 'flex-start', fontSize: 16, ml: 1}}>Texte simple</Typography>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding
                onClick={() => handleAddQuestion(QuestionType.SELECT)}
                >
                    <ListItemButton>
                        <QuestionAvatarIcon icon={<Checklist />} color={themeConstants.colors.questionTypes.multipleChoice} />
                        <Typography variant='body1' sx={{justifySelf: 'flex-start', fontSize: 16, ml: 1}}>Choix multiples</Typography>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>

    );

    //TODO replace type by a variable type (depends on user selected type in a future dropdown select)
    const handleAddQuestion = (type: QuestionType) => {
        setFormContext((form) => {
            if(!form) return;
            console.log("formContext ===> ", form);
            const createQuestionInput: NewEmptyQuestion = {
                title: 'Nouvelle question',
                description: '',
                type,
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
            <Box sx={{display: 'flex', justifyContent: 'space-around', alignContent: 'center', alignItems: 'center'}} my={themeConstants.spacing.quarterSm} >
                <Typography variant='body1' sx={{justifySelf: 'flex-start', fontSize: 16}}>Questions</Typography>
                <Box sx={{backgroundColor: themeConstants.colors.grey, mr: 3, borderRadius: '20%'}}>
                    <Popover 
                        btnTitle='+'
                        children={popoverContent}
                        btnColor='info'
                        customStyle={{backgroundColor: themeConstants.colors.grey, color: themeConstants.colors.black, fontSize: 20}}
                    />
                </Box>
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
                                {displayAvatarItem(type, index)}
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

