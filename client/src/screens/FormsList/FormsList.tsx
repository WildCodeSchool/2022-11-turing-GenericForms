import React, { useState } from 'react';
import { Button, FormControl, Grid, MenuItem, Select, Theme, Typography  } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useQuery } from '@apollo/client';
import { READ_FORMS } from '../../services/forms.query';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styles } from './FormsListStyles';
import theme from '../../styles/theme';
import { themeConstants } from '../../styles/theme.constants';

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides{
      label: true;
    }
}

interface FormsListProps {};

const useStyles = makeStyles(styles);

const useCss = (theme: Theme) => ({
    formsListContainer: {
        border: '1px solid #000000',
        height: '8vh',
        margin: '1vh 1vw',
    },
    centerTxt: {
        textAlign: 'center',
    },
    row2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '4vw',
        height: '10vh',
    },
    row3: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5vh',
    },
    formsRow:{
        justifyContent: 'center',
    },
    icon:{
        color: theme.palette.primary.main,
        right: 12,
        position: 'absolute',
        userSelect: 'none',
        pointerEvents: 'none'
    },
    select: {
        minWidth: 80,
        height: 40,
        backgroundColor: themeConstants.colors.paperWhite,
        color: theme.palette.primary.main,
        fontWeight: 400,
        borderStyle: 'none',
        borderWidth: 2,
        borderRadius: 1,
        padding: 1,
        boxShadow: '0px 5px 8px -3px rgba(0,0,0,0.14)',
    },
    
});

function FormsList({}: FormsListProps) {
    const classes = useStyles();

    const css = useCss(theme);

    //Pass custom props to redesign the Menu elements used in the Select component : mui.com/material-ui/api/menu/
    //It inherits props from Popover : mui.com/material-ui/api/popover/
    const menuProps = {
        classes: {
            paper: classes.paper,
            list: classes.list,
        },
       anchorOrigin: {
        horizontal: 10,
        vertical: 10,
        },
        transformOrigin: {
            horizontal: 10,
            vertical: 10,
        }
    };
    const {data: formsData, loading, error, refetch} = useQuery<ReadFormsDTO>(READ_FORMS, {
        //authorization token in header set automatically ? 
        onCompleted(data: ReadFormsDTO) {
            console.log(data);
        },
        onError(error) {
            console.log(error);
        }
    });

    const [val,setVal] = useState(1);

    const handleChange = (event: any) => {
      setVal(event.target.value);
    };
    
    const iconComponent = (props: any) => {
      return (
        <ExpandMoreIcon sx={css.icon}/>
      )};

    return (
        <>
            <Grid container sx={css.row2} >
                <Grid item xs={9} >
                    <Button variant='contained'>
                        + Créer un formulaire
                    </Button>
                </Grid>
                <Grid item xs={3} >
                    <FormControl>
                        <Select
                            disableUnderline
                            sx={css.select}
                            MenuProps={menuProps}
                            IconComponent={iconComponent}
                            value={val}
                            onChange={handleChange}
                        >
                            <MenuItem value={0}>Questions</MenuItem>
                            <MenuItem value={1}>Modifié le</MenuItem>
                            <MenuItem value={2}>Réponses</MenuItem>
                            <MenuItem value={3}>Actif</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container sx={css.row3} >
                <Grid item xs={6} />
                <Grid item xs={1} >
                    <Typography variant="label" component={'p'} sx={css.centerTxt} >Questions</Typography>
                </Grid>
                <Grid item xs={1} >
                    <Typography variant="label" component={'p'} sx={css.centerTxt} >Réponses</Typography>
                </Grid>
                <Grid item xs={2} >
                    <Typography variant="label" component={'p'} sx={css.centerTxt} >Modifié le</Typography>
                </Grid>
                <Grid item xs={1} >
                    <Typography variant="label" component={'p'} sx={css.centerTxt} >Actif</Typography>
                </Grid>
                <Grid item xs={1}  />
            </Grid>
            
            {
                formsData?.readForms.map((form) => (
                    <Grid container key={form.formId} sx={css.formsListContainer} alignContent="center" alignItems="center" >
                        <Grid item xs={2} display="flex" justifyContent="center">
                            <LocalPostOfficeIcon fontSize='large' color='secondary'/>
                        </Grid>
                        <Grid item xs={2} className={classes.title}>
                            <Typography variant="body1" sx={css.centerTxt}>{form.title}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" sx={css.centerTxt}>{form.category}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body1" sx={css.centerTxt}>55</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body1" sx={css.centerTxt}>55</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" sx={css.centerTxt}>{form.themeId}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body1" sx={css.centerTxt}>Oui</Typography>
                        </Grid>
                        <Grid item xs={1} display="flex" justifyContent="center">
                            <MoreVertIcon fontSize='large' color='disabled' />
                        </Grid>
                    </Grid>
                ))
            }
            
                
        </>
    )
}

export default FormsList;