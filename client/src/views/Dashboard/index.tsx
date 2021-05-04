import { Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getLinks } from '../../actions/links.actions';
import { RootState } from '../../store';
import DashboardContent from './components/DashboardContent';
import Header from './components/Header';
import NavigationDrawer from './components/NavigationDrawer';

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

const Dashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const links = useSelector((state: RootState) => state.links);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  const classes = useStyles();

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
        {!links.loading && !!links.linksInfo && (
          <DashboardContent linksInfo={links.linksInfo} />
        )}
      </main>
    </Box>
  );
};

export default Dashboard;
