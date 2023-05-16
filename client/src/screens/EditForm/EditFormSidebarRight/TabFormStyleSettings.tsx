import React from 'react';
import { ReadThemesDTO, ThemeDTO } from '../../../types/theme';
import { useQuery } from '@apollo/client';
import { READ_THEMES } from '../../../services/theme.query';
import { parseToSelectItems } from '../../../utils/common.utils';
import { SelectItem } from '../../../types/common';
import { themeConstants } from '../../../styles/theme.constants';
import {Box, TextField, Typography} from '@mui/material';
import SelectListDrop from '../../../components/common/SelectListDrop';

function TabFormStyleSettings() {
  const [theme, setTheme] = React.useState<ThemeDTO>();

  const {data: dataThemes, loading: themesLoading, error: themesError} = useQuery<ReadThemesDTO>(READ_THEMES, {
    onCompleted(data: ReadThemesDTO) {
      console.log("get themes data completed ==>", data.readThemes);
    },
    onError(error) {
        console.log(error);
    }
  });

  return (
    <Box>
      <Box sx={styles.tab}>
        <Typography variant='h6' sx={styles.tabTitle}>Thème graphique</Typography>
        <SelectListDrop menuItems={parseToSelectItems(dataThemes?.readThemes)} />
      </Box>
      <Box sx={styles.tab}>
        <Typography variant='h6' sx={styles.tabTitle}>Customiser le thème</Typography>
        <Box>
          <TextField
            id="outlined-basic"
            label="Couleur d'arrière plan"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Couleur primaire"
            variant="outlined"
          />
        </Box>
        <Box>
          <TextField
            id="outlined-basic"
            label="Couleur secondaire"
            variant="outlined"
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