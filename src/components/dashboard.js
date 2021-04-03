import React from 'react';
import { Box, Grid, ResponsiveContext } from 'grommet';

// Import custom components
import AddPanel from './panels/addPanel'
import DataTablePanel from "./panels/dataTablePanel"


const Dashboard = (props) => {

    const [editData, setEditData] = React.useState({});
    const [loadFirebaseData, setLoadFirebaseData] = React.useState(true)

    const breakpoints = {
      vertical : {
        rows: ['auto', 'auto'],
        columns: ['auto'],
        areas: {
          add_panel : { start: [0,0], end: [0,1]},
          data_panel : {start: [0,1], end: [0,1]}
        }
      },
      horizontal : {
        rows: ['auto'],
        columns: ['medium', 'auto'],
        areas: {
          add_panel : { start: [0,0], end: [0,0]},
          data_panel : {start: [1,0], end: [1,0]}
        }
      }
    }

    return(
      <ResponsiveContext.Consumer>
        { size => {
            let direction = ['xxsmall', 'xsmall', 'small'].includes(size)? 'vertical' : 'horizontal';
            return (
            <Grid
            rows={breakpoints[direction].rows}
            columns={breakpoints[direction].columns}
            gap="xsmall"
            areas={[
              { name: 'add-panel', start: breakpoints[direction].areas.add_panel.start, end: breakpoints[direction].areas.add_panel.end },
              { name: 'data-panel', start: breakpoints[direction].areas.data_panel.start, end: breakpoints[direction].areas.data_panel.end },
            ]}
          >
            <Box size={direction} animation={{type:"slideUp", delay:0, size:"large", duration:500}} pad={{vertical: "large", horizontal: "medium"}} gridArea="add-panel" background="white">
              <AddPanel editData={editData} setEditData={setEditData} loadFirebaseData={loadFirebaseData} setLoadFirebaseData={setLoadFirebaseData}/>
            </Box>
            <Box size={direction} animation={{type:"slideUp", delay:0, size:"large", duration:500}} pad={{top:"large", bottom:"medium", horizontal: "medium"}} gridArea="data-panel" background="white">
              <DataTablePanel setEditData={setEditData} loadFirebaseData={loadFirebaseData}/>
            </Box>
          </Grid>
          )
        }}
      </ResponsiveContext.Consumer>

    )
}

export default Dashboard;