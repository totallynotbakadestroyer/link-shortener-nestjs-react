import { Box, Button, LinearProgress, TextField } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React, { useState } from 'react';

import { linksService } from '../../../../services/links.service';

const Header = ({
  drawerWidth,
  open,
  handleDrawerOpen,
}: {
  drawerWidth: number;
  open: boolean;
  handleDrawerOpen: () => void;
}): JSX.Element => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      gutters: theme.mixins.gutters(),
      appBar: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: 36,
      },
      hide: {
        display: 'none',
      },
    }),
  );

  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const shortifyLink = async () => {
    setLoading(true);
    const payload = { to: link };
    const { shortenedLink } = await linksService.createLink(payload);
    setLink(`${window.location.host}/r/${shortenedLink}`);
    setLoading(false);
  };

  const classes = useStyles();

  return (
    <AppBar
      elevation={0}
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Dashboard
        </Typography>
        <Box flexGrow={1} ml={4} mr={2} alignItems={'center'}>
          <div>
            <TextField
              disabled={loading}
              onChange={handleChange}
              value={link}
              label={'Link you want short'}
              size={'small'}
              fullWidth
              variant={'outlined'}
            />
            {loading && <LinearProgress />}
          </div>
        </Box>
        <Button onClick={shortifyLink} disabled={loading} variant={'contained'}>
          Create new link
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
