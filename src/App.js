import React from 'react';
import { Box, Grommet } from 'grommet';
import { HashRouter as Router, Route } from 'react-router-dom';
import "./App.css"


// import custom components
import Header from './components/header';
// import FooterUI from './components/footer';
import Dashboard from './components/dashboard';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login'
import {AuthProvider} from './Auth';

function App() {

  const theme = {
    global: {
      colors: {
        'brand': '#1D337C',
        'accent-1': '#06164a',
        'focus': '#06164a'
      },
      font: {
        family: 'Poppins',
        size: '14px',
        height: '16px',
      },
    },
  };

  return (
    <Grommet theme={theme}>
      <AuthProvider>
        <Box fill background="light-2">
          <Header/>
          <Router>
            <PrivateRoute exact path="/" component={Dashboard}/>
            <Route exact path="/login" component={Login} />
          </Router>
        </Box>
        {/* <FooterUI /> */}
      </AuthProvider>
    </Grommet>
  );
}

export default App;
