import { Grid } from '@material-ui/core';
import { GridRowsProp } from '@material-ui/data-grid';
import React from 'react';

import BrowsersGraph from './components/BrowsersGraph';
import ClicksGraph from './components/ClicksGraph';
import DeviceOSGraphs from './components/DeviceOSGraphs';
import StatCards from './components/StatCards';

const data = [
  { year: '1950', population: 2.525 },
  { year: '1960', population: 3.018 },
  { year: '1970', population: 3.682 },
  { year: '1980', population: 4.44 },
  { year: '1990', population: 5.31 },
  { year: '2000', population: 6.127 },
  { year: '2010', population: 6.93 },
];

const createData = (): any => {
  const data: any[] = [];
  for (let i = 0; i < 30; i++) {
    const element = {
      id: i,
      name: `placeholder${i}`,
      total: Number(Math.random() * 9999),
    };
    data.push(element);
  }
  return data;
};

const rows: GridRowsProp[] = createData();

const DashboardContent = (): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container>
        <StatCards />
      </Grid>
      <Grid xs={12} item>
        <ClicksGraph data={data} />
      </Grid>
      <Grid xs={12} item>
        <DeviceOSGraphs
          deviceRows={rows}
          osRows={rows}
          deviceData={data}
          osData={data}
        />
      </Grid>
      <Grid xs={12} item>
        <BrowsersGraph data={data} rows={rows} />
      </Grid>
    </Grid>
  );
};

export default DashboardContent;
