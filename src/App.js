import { Box, Grid, Grommet } from 'grommet';
import React from 'react';
import "./app.css"


// import custom components
import Header from './components/header'
import AddPanel from './components/panels/addPanel'
import DataTablePanel from "./components/panels/dataTablePanel"

function App() {

  const [editData, setEditData] = React.useState({});

  const theme = {
    global: {
      colors: {
        'brand': '#1D337C',
        'accent-1': '#06164a',
        'focus': '#06164a'
      },
      font: {
        family: 'Poppins',
        size: '16px',
        height: '18px',
      },
    },
  };

  return (
    <Grommet theme={theme}>
      <Box fill background="light-2">
        <Header/>
        <Grid
          rows={['large']}
          columns={['medium', 'auto']}
          gap="xsmall"
          areas={[
            { name: 'add-panel', start: [0, 0], end: [0, 0] },
            { name: 'data-panel', start: [1, 0], end: [1, 0] },
          ]}
        >
          <Box pad={{vertical: "medium", horizontal: "medium"}} gridArea="add-panel" background="white">
            <AddPanel editData={editData} setEditData={setEditData}/>
          </Box>
          <Box pad={{vertical: "large", horizontal: "medium"}} gridArea="data-panel" background="white">
            <DataTablePanel setEditData={setEditData}/>
          </Box>
        </Grid>
      </Box>
    </Grommet>
  );
}

export default App;
