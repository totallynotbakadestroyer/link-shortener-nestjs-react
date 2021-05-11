import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LinkIcon from '@material-ui/icons/Link';
import SettingsIcon from '@material-ui/icons/Settings';
import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationDrawer = ({
  drawerWidth,
  open,
  handleDrawerClose,
  handleSettingsOpen,
}: {
  drawerWidth: number;
  open: boolean;
  handleDrawerClose: () => void;
  handleSettingsOpen: () => void;
}): JSX.Element => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      gutters: theme.mixins.gutters(),
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
      },
      drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      },
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
    }),
  );

  const theme = useTheme();
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem
          classes={{ gutters: clsx(classes.gutters) }}
          button
          key={'Dashboard'}
          component={Link}
          to={'/dashboard'}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={'Dashboard'} />
        </ListItem>
        <ListItem
          classes={{ gutters: clsx(classes.gutters) }}
          button
          key={'Links'}
          component={Link}
          to={'/dashboard/links'}
        >
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary={'Links'} />
        </ListItem>
        <ListItem
          classes={{ gutters: clsx(classes.gutters) }}
          button
          key={'Settings'}
          onClick={handleSettingsOpen}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={'Settings'} />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default NavigationDrawer;
