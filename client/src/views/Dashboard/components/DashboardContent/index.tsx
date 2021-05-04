import { Grid } from '@material-ui/core';
import { GridRowsProp } from '@material-ui/data-grid';
import React from 'react';

import BrowsersGraph from './components/BrowsersGraph';
import ClicksGraph from './components/ClicksGraph';
import DeviceOSGraphs from './components/DeviceOSGraphs';
import StatCards from './components/StatCards';

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

const DashboardContent = ({ linksInfo }: { linksInfo: any }): JSX.Element => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container>
        <StatCards total={linksInfo.total} />
      </Grid>
      <Grid xs={12} item>
        <ClicksGraph data={linksInfo.clicksByDay} />
      </Grid>
      <Grid xs={12} item>
        <DeviceOSGraphs
          deviceData={linksInfo.devices}
          osData={linksInfo.os}
        />
      </Grid>
      <Grid xs={12} item>
        <BrowsersGraph data={linksInfo.browsers} />
      </Grid>
    </Grid>
  );
};

export default DashboardContent;
