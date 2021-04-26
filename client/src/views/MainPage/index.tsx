import { Box } from '@material-ui/core';
import React from 'react';

import Header from './components/Header';
import LinkShortener from './components/LinkShortener';

const MainPage = (): JSX.Element => {
  return (
    <div>
      <Header />
      <Box display={'flex'} justifyContent={'center'} height={400}>
        <LinkShortener />
      </Box>
    </div>
  );
};

export default MainPage;
