import { Animation } from '@devexpress/dx-react-chart';
import { Chart, PieSeries } from '@devexpress/dx-react-chart-material-ui';
import {Box, Grid} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import {GridColDef} from "@material-ui/data-grid";
import React from 'react';

import DataTable from '../../../../../../../../components/DataTable';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'total', headerName: 'Total', flex: 1 },
];

const DeviceGraph = ({ data, rows }: { data: any[], rows: any[] }): JSX.Element => (
  <Grid container>
    <Grid xs={12} md={6} item>
      <Box textAlign={'left'}>
        <Typography>Device type</Typography>
      </Box>
      <Chart data={data}>
        <PieSeries valueField="population" argumentField="year" />
        <Animation />
      </Chart>
    </Grid>
    <Grid item xs={12} md={6}>
      <DataTable rows={rows} columns={columns} />
    </Grid>
  </Grid>
);

export default DeviceGraph;