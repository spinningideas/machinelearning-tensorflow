import { createMuiTheme } from '@material-ui/core/styles';
// https://material-ui.com/customization/palette/
const appGrey = {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#eeeeee',
  300: '#e0e0e0',
  400: '#bdbdbd',
  500: '#303030',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#d5d5d5',
  A200: '#aaaaaa',
  A400: '#303030',
  A700: '#616161',
  contrastDefaultColor: 'dark',
};

const appBlue = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#1976d2',
  600: '#1e88e5',
  700: '#1976d2',
  800: '#1565c0',
  900: '#0d47a1',
  A100: '#1e88e5',
  A200: '#1976d2',
  A400: '#1976d2',
  A700: '#0d47a1',
  contrastDefaultColor: 'light',
  light: '#bbdefb',
};

const primaryDark = appBlue[700];
const primaryDarker = appBlue[900];
const secondaryDark = appBlue[700];
const secondaryDarker = appBlue[900];
const light = appGrey[100];
const dark = appGrey[900];
const white = '#FFFFFF';

const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", sans-serif',
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    primary: appBlue,
    secondary: appBlue,
  },
  primary: {
    main: white,
    light: white,
    dark: primaryDark,
    contrastText: secondaryDarker,
    text: dark,
  },
  secondary: {
    main: white,
    light: white,
    dark: secondaryDark,
    text: dark,
    contrastText: dark,
  },
  light: {
    background: {
      default: white,
      paper: white,
      appBar: white,
      contentFrame: '#eeeeee',
      chip: light,
    },
  },
  dark: {
    background: {
      default: '#fafafa',
      paper: white,
      appBar: dark,
      contentFrame: '#eeeeee',
      chip: light,
    },
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: dark,
        backgroundColor: white,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: white,
      },
    },
    MuiCard: {
      root: {
        color: dark,
        backgroundColor: white,
      },
    },
    MuiInput: {
      input: {
        padding: 10,
      },
    },
    MuiButton: {
      textPrimary: {
        background: primaryDark,
        color: light,
        borderRadius: 0,
        border: 0,
        height: 40,
        padding: '0 15px',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: primaryDarker,
          color: light,
        },
      },
      textSecondary: {
        background: secondaryDark,
        color: light,
        borderRadius: 0,
        border: 0,
        height: 40,
        padding: '0 15px',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: secondaryDarker,
          color: light,
        },
      },
      outlinedPrimary: {
        borderRadius: 0,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 0,
      },
    },
  },
  gutters: 0,
});

export default theme;
