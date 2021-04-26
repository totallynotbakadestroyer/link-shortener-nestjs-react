import { Box, Button, Container, Typography } from '@material-ui/core';
import React, { useState } from 'react';

import SignInModel from '../SignInModel';

const Header = (): JSX.Element => {
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
    <React.Fragment>
      <Box py={2}>
        <Container>
          <Box alignItems={'center'} display={'flex'}>
            <Box flexGrow={1}>
              <div>
                <Typography align={'left'} variant={'h4'}>
                  Shorterino
                </Typography>
              </div>
            </Box>
            <Box display={'flex'}>
              <Box mr={2}>
                <Button onClick={handleOpenLogin}>Login</Button>
              </Box>
              <Box>
                <Button onClick={handleOpenSignUp} color={'primary'} variant={'contained'}>
                  Sign up
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <SignInModel
        setTab={setTab}
        tab={tab}
        open={open}
        handleClose={handleClose}
      />
    </React.Fragment>
  );
};

export default Header;
