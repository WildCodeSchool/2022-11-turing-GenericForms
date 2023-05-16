import React from 'react';
import { Button, Grid, Theme, Typography  } from '@mui/material';
import { useQuery } from '@apollo/client';
import { READ_FORMS } from '../../services/forms.query';
import theme from '../../styles/theme';
import FormItem from '../../components/FormItem';
import SelectListDrop from '../../components/common/SelectListDrop';
import { FormDTO, ReadFormsDTO } from '../../types/form';
import { useUserState } from '../../providers/userState';
import { Error } from '@mui/icons-material';
import { SelectItem } from '../../types/common';

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides{
      label: true;
    }
}

interface FormsListProps {
    forms: FormDTO[] | undefined;
};

const useCss = (theme: Theme) => ({
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
});

const menuItemsArray: SelectItem[] = [
    {value: 0, label: 'Questions'},
    {value: 1, label: 'Modifié le'},
    {value: 2, label: 'Réponses'},
    {value: 3, label: 'Actif'},
];

function FormsList({forms}: FormsListProps) {
    const css = useCss(theme);

    if(forms === undefined) {
        return <Error>Erreur lors du chargement des formulaires</Error>
    }
    forms?.length === 0 && <div>Aucun formulaire n'a été créé</div>

    return (
        <>
            <Grid container sx={css.row2} >
                <Grid item xs={9} >
                    <Button variant='contained'>
                        + Créer un formulaire
                    </Button>
                </Grid>
                <Grid item xs={3} >
                    <SelectListDrop menuItems={menuItemsArray} />
                </Grid>
            </Grid>
            {forms?.length === 0 ? 
                <Typography>Auncun formulaire en cours. Créer en un !</Typography>
            :   
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
            }
            {
                forms.map((form) => (
                    <FormItem key={form.formId} form={form} />
                ))
            }    
        </>
    )
}

export default FormsList;