import { Animation } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Box, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const ClicksGraph = ({ data }: { data: any[] }): JSX.Element => {
  return (
    <Paper>
      <Box p={2}>
        <Box textAlign={'start'}>
          <Typography>Clicks graph</Typography>
        </Box>
        <Chart data={data}>
          <ArgumentAxis />
          <ValueAxis />

          <BarSeries valueField="population" argumentField="year" />
          <Animation />
        </Chart>
      </Box>
    </Paper>
  );
};

export default ClicksGraph;
