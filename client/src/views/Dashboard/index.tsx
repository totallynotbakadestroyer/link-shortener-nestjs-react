import { Box, Grid } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { getLinks } from '../../actions/links.actions';
import Header from './components/Header';
import LinksBox from './components/LinksBox';
import LinkSummary from './components/LinkSummary';
import NavigationDrawer from './components/NavigationDrawer';
import SummaryStats from './components/SummaryStats';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Dashboard = ({match}: {match: any}): JSX.Element => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const linksMatch = useRouteMatch('/dashboard/links');

  useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  return (
    <Box display={'flex'}>
      <CssBaseline />
      <Header
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <NavigationDrawer
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={2}>
          {linksMatch && (
            <Grid xs={2} item>
              <LinksBox />
            </Grid>
          )}
          <Grid item xs={linksMatch ? 10 : 12}>
              <Switch>
                <Route path={match.url + '/links/:id'}>
                  <LinkSummary />
                </Route>
                <Route path={match.url}>
                  <SummaryStats />
                </Route>
              </Switch>
          </Grid>
        </Grid>
      </main>
    </Box>
  );
};

export default Dashboard;
