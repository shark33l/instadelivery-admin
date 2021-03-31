import React from 'react';
import { Box, Grid } from 'grommet';

// Import custom components
import AddPanel from './panels/addPanel'
import DataTablePanel from "./panels/dataTablePanel"


const Dashboard = (props) => {

    const [editData, setEditData] = React.useState({});
    const [loadFirebaseData, setLoadFirebaseData] = React.useState(true)

    return(
        <Grid
          rows={['large']}
          columns={['medium', 'auto']}
          gap="xsmall"
          areas={[
            { name: 'add-panel', start: [0, 0], end: [0, 0] },
            { name: 'data-panel', start: [1, 0], end: [1, 0] },
          ]}
        >
          <Box size="vertical" animation={{type:"slideUp", delay:0, size:"large", duration:500}} pad={{vertical: "large", horizontal: "medium"}} gridArea="add-panel" background="white">
            <AddPanel editData={editData} setEditData={setEditData} loadFirebaseData={loadFirebaseData} setLoadFirebaseData={setLoadFirebaseData}/>
          </Box>
          <Box animation={{type:"slideUp", delay:0, size:"large", duration:500}} pad={{top:"large", bottom:"xlarge", horizontal: "medium"}} gridArea="data-panel" background="white">
            <DataTablePanel setEditData={setEditData} loadFirebaseData={loadFirebaseData}/>
          </Box>
        </Grid>

    )
}

export default Dashboard;