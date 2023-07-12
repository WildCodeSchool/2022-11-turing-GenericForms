import React, { useEffect } from 'react';
import { ReadThemeDTO, ReadThemesDTO, ThemeDTO } from '../../../types/theme';
import { useLazyQuery, useQuery } from '@apollo/client';
import { READ_THEME, READ_THEMES } from '../../../services/theme.query';
import { parseToSelectItems } from '../../../utils/common.utils';
import { SelectItem } from '../../../types/common';
import { themeConstants } from '../../../styles/theme.constants';
import {Box, TextField, Typography} from '@mui/material';
import SelectListDrop from '../../../components/common/SelectListDrop';
import { useEditFormState } from '../../../providers/formState';

function TabFormSettings() {
  const {formContext, setFormContext} = useEditFormState();
  const [menuItems, setMenuItems] = React.useState<SelectItem[]>([]);
  const [themeId, setThemeId] = React.useState<number | undefined>(formContext?.theme.themeId);
  const [theme, setTheme] = React.useState<ThemeDTO | undefined>(formContext?.theme);

  const {data: dataThemes, loading: themesLoading, error: themesError} = useQuery<ReadThemesDTO>(READ_THEMES, {
    onCompleted(data: ReadThemesDTO) {
      setMenuItems(parseToSelectItems(data.readThemes));
    },
    onError(error) {
        console.log(error);
    }
  });

  const [refetch] = useLazyQuery<ReadThemeDTO>(READ_THEME, {
    variables: { themeId: themeId},
  });

  useEffect(() => {
    console.log('theme chosen ==>', themeId );
    refetch({variables: {themeId: themeId}}).then((res) => {
      console.log('res', res);
      res.data && setTheme(res.data?.readOneTheme);
    }).catch((error) => {
      console.log('error', error);
    });
  }, [themeId])

  const handleChange = (value: number) => {
    setThemeId(value);
    setFormContext((form) => {
      if(!form) return;
        return {
            ...form,
            theme: {
              ...form.theme,
              themeId: value
            }
        }
    });
  };

  const handleChangeDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormContext((form) => {
      if(!form) return;
        return {
            ...form,
            [event.target.name]: event.target.value
        }
    });
  };

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme((theme) => {
      if(!theme) return;
      return {
        ...theme,
        [event.target.name]: event.target.value
      }
    });
    setFormContext((form) => {
      if(!form) return;
        return {
            ...form,
            theme: {
              ...form.theme,
              [event.target.name]: event.target.value
            }
        }
    });
};

  return (
    <Box>
      <Box sx={styles.tab}>
        <Typography variant='h6' sx={styles.tabTitle}>Détails</Typography>
        <TextField
            id="outlined-basic"
            label="Titre"
            variant="outlined"
            name='title'
            value={formContext?.title}
            onChange={handleChangeDetails}
            required
        />
         <TextField
            id="outlined-basic"
            label="Catégorie"
            variant="outlined"
            name='category'
            value={formContext?.category}
            onChange={handleChangeDetails}
            required
        />
        {/* TODO : add a select list to choose a category => use an enum category table for now, on form creation set a default category like "Autres" */}
        <Typography variant='body1'>Catégorie</Typography>
        {<SelectListDrop menuItems={[{label: 'Autres', value: 0}]} handleChange={handleChange} initialValue={0} />}
      </Box>
      <Box sx={styles.tab}>
        <Typography variant='h6' sx={styles.tabTitle}>Thème graphique</Typography>
        {menuItems.length > 0 && <SelectListDrop menuItems={menuItems} handleChange={handleChange} initialValue={formContext?.theme.themeId} />}
      </Box>
      <Box sx={styles.tab}>
        <Box>
          <TextField
            id="outlined-basic"
            label="Couleur d'arrière plan"
            variant="outlined"
            name='backgroundColor'
            value={theme?.backgroundColor}
            onChange={handleChangeColor}
            required
            disabled
          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Couleur primaire"
            variant="outlined"
            name='primaryColor'
            value={theme?.primaryColor}
            onChange={handleChangeColor}
            required
            disabled
          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Couleur secondaire"
            variant="outlined"
            name='secondaryColor'
            value={theme?.secondaryColor}
            onChange={handleChangeColor}
            required
            disabled
          />
        </Box>
      </Box>
    </Box>
  )
}

const styles = {
  tab: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: themeConstants.spacing.quarterSm,
    marginTop: themeConstants.spacing.min,
    marginBottom: themeConstants.spacing.quarter,
  },
  tabTitle: {
    fontWeight: 'bold',
    marginBottom: themeConstants.spacing.min,
  },
};

export default TabFormSettings;