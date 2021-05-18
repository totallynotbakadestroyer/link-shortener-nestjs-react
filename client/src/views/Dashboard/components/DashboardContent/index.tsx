import { Box, Grid, Typography } from '@material-ui/core';
import React from 'react';

import BrowsersGraph from './components/BrowsersGraph';
import ClicksGraph from './components/ClicksGraph';
import DeviceOSGraphs from './components/DeviceOSGraphs';
import StatCards from './components/StatCards';

const DashboardContent = ({
  linksInfo,
  loading,
}: {
  linksInfo: any;
  loading: boolean;
}): JSX.Element | null => {
  if (loading) {
    return null;
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} container>
        <StatCards total={linksInfo.total} />
      </Grid>
      {linksInfo.total.totalAllTime === 0 ? (
        <Grid xs={12} item>
          <Box>
            <Typography>
              Graphs will be avaiable after someone visit your link
            </Typography>
          </Box>
        </Grid>
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </Grid>
  );
};

export default DashboardContent;
