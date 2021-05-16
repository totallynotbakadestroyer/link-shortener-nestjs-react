import {Box} from '@material-ui/core';
import React from 'react';

import Header from './components/Header';
import LinkShortener from './components/LinkShortener';
import Wave from 'react-wavify';

const MainPage = (): JSX.Element => {
  return (
    <Box height={'100vh'} display={'flex'} flexDirection={'column'}>
      <Header />
      <Box
        height={'100%'}
        flexGrow={1}
        display={'flex'}
        justifyContent={'center'}
      >
        <LinkShortener />
      </Box>
      <Wave
        fill="#f79902"
        paused={false}
        options={{
          height: 40,
          amplitude: 50,
          speed: 0.2,
          points: 3,
        }}
      />
    </Box>
  );
};

export default MainPage;
