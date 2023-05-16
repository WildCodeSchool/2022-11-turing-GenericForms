import React, { useEffect } from 'react';
import { ReadThemesDTO, ThemeDTO } from '../../../types/theme';
import { useQuery } from '@apollo/client';
import { READ_THEMES } from '../../../services/theme.query';
import { parseToSelectItems } from '../../../utils/common.utils';
import { SelectItem } from '../../../types/common';
import { themeConstants } from '../../../styles/theme.constants';
import {Box, TextField, Typography} from '@mui/material';
import SelectListDrop from '../../../components/common/SelectListDrop';
import { useEditFormState } from '../../../providers/formState';

function TabFormStyleSettings() {
  const [formContext, setFormContext] = useEditFormState();
  const [menuItems, setMenuItems] = React.useState<SelectItem[]>([]);
  const [themeId, setThemeId] = React.useState<number>(formContext?.theme.themeId); // = themeId 

  const {data: dataThemes, loading: themesLoading, error: themesError} = useQuery<ReadThemesDTO>(READ_THEMES, {
    onCompleted(data: ReadThemesDTO) {
      setMenuItems(parseToSelectItems(data.readThemes));
      console.log("form themeId ==>", themeId);
    },
    onError(error) {
        console.log(error);
    }
  });

  useEffect(() => {
    console.log('theme chosen ==>', themeId )
  }, [themeId])

  const handleChange = (value: number) => {
    setThemeId(value);
  };

  return (
    <Box>
      <Box sx={styles.tab}>
        <Typography variant='h6' sx={styles.tabTitle}>Thème graphique</Typography>
        {menuItems.length > 0 && <SelectListDrop menuItems={menuItems} handleChange={handleChange} />}
      </Box>
      <Box sx={styles.tab}>
        <Typography variant='h6' sx={styles.tabTitle}>Customiser le thème</Typography>
        <Box>
          <TextField
            id="outlined-basic"
            label="Couleur d'arrière plan"
            variant="outlined"
            value={formContext?.theme.backgroundColor}
          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Couleur primaire"
            variant="outlined"
            value={formContext?.theme.primaryColor}
          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Couleur secondaire"
            variant="outlined"
            value={formContext?.theme.secondaryColor}
          />
        </Box>
      </Box>
    </Box>
  )
};

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

export default TabFormStyleSettings;