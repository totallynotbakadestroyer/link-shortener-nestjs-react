import {AppBar, Box, Button, Toolbar, Typography} from '@material-ui/core';
import React, { useState } from 'react';

import SignInModel from '../SignInModel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
    },
    toolbar: {
      textAlign: 'left',
      flexDirection: 'row',
      [theme.breakpoints.only('xs')]: {
        textAlign: 'center',
        flexDirection: 'column'
      },
    }
  }),
);

const Header = (): JSX.Element => {
  const classes = useStyles();

  const handleOpenLogin = () => {
    setTab('login');
    setOpen(true);
  };

  const handleOpenSignUp = () => {
    setTab('signup');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [open, setOpen] = useState<boolean>(false);

  return (
    <AppBar position={'static'} elevation={0} className={classes.root}>
      <Toolbar>
          <Box
            justifyContent={'center'}
            alignItems={'center'}
            display={'flex'}
            flexWrap={'wrap'}
            width={'100%'}
            className={classes.toolbar}
          >
            <Box flex={1} flexGrow={1}>
              <Typography variant={'h4'}>Shorterino</Typography>
            </Box>
            <Box my={1} display={'flex'}>
              <Box mr={2}>
                <Button onClick={handleOpenLogin}>Login</Button>
              </Box>
              <Box>
                <Button
                  onClick={handleOpenSignUp}
                  color={'primary'}
                  variant={'contained'}
                >
                  Sign up
                </Button>
              </Box>
            </Box>
          </Box>
      </Toolbar>
      <SignInModel
        setTab={setTab}
        tab={tab}
        open={open}
        handleClose={handleClose}
      />
    </AppBar>
  );
};

export default Header;
