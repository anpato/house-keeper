import { ThemeOptions } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#592BE6'
    },
    secondary: {
      main: '#161821'
    },
    warning: {
      main: '#F7D06B'
    },
    error: {
      main: '#EF476F'
    },
    success: {
      main: '#05D8A0'
    },
    background: {
      default: '#FFFFFF',
      paper: '#FAFAFA'
    },
    info: {
      main: '#8268FE'
    }
  }
};

const darkthemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#A9DFD8'
    },
    secondary: {
      main: '#F2C8EE'
    },
    warning: {
      main: '#FEB95A'
    },
    error: {
      main: '#EE786C'
    },
    success: {
      main: '#05D8A0'
    },
    background: {
      default: '#161821',
      paper: '#21222D'
    },
    info: {
      main: '#16AEFF'
    }
  }
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkthemeOptions);
