import {
  AppBar,
  Box,
  Button,
  Hidden,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import { addCreatedLink } from 'actions/links.actions';
import clsx from 'clsx';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { linksService } from 'services/links.service';

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

  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };

  const shortifyLink = async () => {
    setLoading(true);
    const payload = { to: link };
    const createdLink = await linksService.createLink(payload);
    setLink(`${window.location.host}/r/${createdLink.shortenedLink}`);
    setLoading(false);
    dispatch(addCreatedLink(createdLink));
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
        <Hidden mdDown>
          <Box mr={4}>
            <Typography variant="h6" noWrap>
              Dashboard
            </Typography>
          </Box>
        </Hidden>
        <Box flexGrow={1} mr={2} alignItems={'center'}>
          <div>
            <TextField
              disabled={loading}
              onChange={handleChange}
              value={link}
              label={'Link to shortify'}
              size={'small'}
              fullWidth
              variant={'outlined'}
              InputProps={{
                endAdornment: (
                  <div>
                    {link && (
                      <Hidden smUp>
                        <InputAdornment position="end">
                          <IconButton color={'secondary'}>
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      </Hidden>
                    )}
                  </div>
                ),
              }}
            />
            {loading && <LinearProgress />}
          </div>
        </Box>
        <Hidden xsDown>
          <Button
            onClick={shortifyLink}
            disabled={loading}
            variant={'contained'}
          >
            Create new link
          </Button>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
