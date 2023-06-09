import { createTheme, adaptV4Theme } from '@mui/material/styles';

export default createTheme(adaptV4Theme({
  typography: {
    useNextVariants: true
  }
}));
