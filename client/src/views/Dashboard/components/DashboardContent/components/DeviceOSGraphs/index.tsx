import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';

import DeviceGraph from './components/DeviceGraph';
import OSGraph from './components/OSGraph';

const DeviceOSGraphs = ({
  deviceData,
  osData,
}: {
  deviceData: any[];
  osData: any[];
}): JSX.Element => (
  <Paper>
    <Box p={2}>
      <Grid spacing={2} container>
        <Grid item xs={12} md={6}>
          <DeviceGraph data={deviceData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <OSGraph data={osData} />
        </Grid>
      </Grid>
    </Box>
  </Paper>
);

export default DeviceOSGraphs;
