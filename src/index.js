// React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// Theme - material-ui
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from 'theming';
// App
import 'styles/Application.scss';
import Application from 'Application';
import ErrorHandler from 'components/ErrorHandler';
import { APPBASEPATH } from 'utils';

const AppShell = () => (
  <ErrorHandler>
    <MuiThemeProvider theme={theme}>
      <Router basename={APPBASEPATH}>
        <Application />
      </Router>
    </MuiThemeProvider>
  </ErrorHandler>
);

ReactDOM.render(<AppShell />, document.getElementById('appshell'));
