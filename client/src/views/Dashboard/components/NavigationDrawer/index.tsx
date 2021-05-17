import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LinkIcon from '@material-ui/icons/Link';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SettingsIcon from '@material-ui/icons/Settings';
import { switchDarkMode } from 'actions/settings.actions';
import clsx from 'clsx';
import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { RootState } from 'store';

import { logOut } from '../../../../actions/user.actions';

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

  const classes = useStyles();
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.settings);
  const history = useHistory();

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
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <Box height={'100%'} flexDirection={'column'} display={'flex'}>
        <Box flexGrow={1}>
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
        </Box>
        <Divider />
        <List>
          <ListItem
            classes={{ gutters: clsx(classes.gutters) }}
            key={'darkMode'}
            button
            onClick={() => dispatch(switchDarkMode())}
          >
            <ListItemIcon>
              {settings.isDark ? <Brightness4Icon /> : <Brightness7Icon />}
            </ListItemIcon>
            <ListItemText
              primary={`Switch to ${settings.isDark ? 'light' : 'dark'} mode`}
            />
          </ListItem>
          <ListItem
            classes={{ gutters: clsx(classes.gutters) }}
            key={'darkMode'}
            button
            onClick={() => dispatch(logOut(history))}
          >
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;
