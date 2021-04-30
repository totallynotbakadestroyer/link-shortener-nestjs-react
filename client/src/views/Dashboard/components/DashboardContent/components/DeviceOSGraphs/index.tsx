import { Box, Grid, Paper } from '@material-ui/core';
import React from 'react';

import DeviceGraph from './components/DeviceGraph';
import OSGraph from './components/OSGraph';

const DeviceOSGraphs = ({
  deviceData,
  deviceRows,
  osData,
  osRows,
}: {
  deviceData: any[];
  deviceRows: any[];
  osData: any[];
  osRows: any[];
}): JSX.Element => (
  <Paper>
    <Box p={2}>
      <Grid spacing={2} container>
        <Grid item xs={12} md={6}>
          <DeviceGraph rows={deviceRows} data={deviceData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <OSGraph rows={osRows} data={osData} />
        </Grid>
      </Grid>
    </Box>
  </Paper>
);

export default DeviceOSGraphs;
