import { Grid } from '@material-ui/core';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import TimelineIcon from '@material-ui/icons/Timeline';
import { ChartPie, CursorDefaultClick } from 'mdi-material-ui';
import React from 'react';

import SingleStatCard from './components/SingleStatCard';

const StatCards = ({ total }: { total: any }): JSX.Element => {
  const cards = [
    {
      count: total.totalAllTime,
      subtitle: 'Total number of clicks',
      icon: CursorDefaultClick,
    },
    {
      count: total.total30Days,
      subtitle: 'Clicks in the last 30 days',
      icon: CalendarTodayOutlinedIcon,
    },
    {
      count: total.total7Days,
      subtitle: 'Clicks in the last 7 days',
      icon: ChartPie,
    },
    {
      count: total.totalToday,
      subtitle: 'Clicks in the last 24 hours',
      icon: TimelineIcon,
    },
  ];
  return (
    <React.Fragment>
      {cards.map(x => (
        <Grid item xl={3} md={6} xs={12} key={x.subtitle}>
          <SingleStatCard count={x.count} icon={x.icon} subtitle={x.subtitle} />
        </Grid>
      ))}
    </React.Fragment>
  );
};

export default StatCards;
