import {
  Box,
  Button,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import { ContentCopy } from 'mdi-material-ui';
import React from 'react';

const LinkShortener = (): JSX.Element => {
  return (
    <Box my={'auto'}>
      <Container>
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
          <Typography variant={'h2'}>Shorterino</Typography>
          <Box my={2} width={'65%'}>
            <Typography variant={'subtitle1'}>
              Shorterino is a simple link shortener that allows you to control
              and monitor all your links activity. Only if you are registered
              tho. Or just shortify your link here:
            </Typography>
          </Box>
          <Box width={'65%'} display={'flex'} flexDirection={'row'}>
            <Box flexGrow={1} mr={1}>
              <TextField
                variant={'outlined'}
                fullWidth
                placeholder={'Enter link you want to shortify here:'}
              />
            </Box>
            <Button variant={'outlined'}>Shortify</Button>
          </Box>
          <Box
            position={'relative'}
            width={'45%'}
            mt={4}
            p={2}
            bgcolor={'success.main'}
            color={'white'}
          >
            <Typography variant={'h5'}>www.placeholderlink.com/fgf</Typography>
            <Box
              position={'absolute'}
              right={0}
              top={'50%'}
              style={{transform: 'translateY(-50%)'}}
            >
              <IconButton>
                <ContentCopy />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default LinkShortener;
