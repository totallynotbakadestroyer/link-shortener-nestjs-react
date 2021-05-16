import {
  Box,
  Button,
  Container,
  Hidden,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { ContentCopy } from 'mdi-material-ui';
import React, { useState } from 'react';

import { linksService } from 'services/links.service';

const LinkShortener = (): JSX.Element => {
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const shortifyLink = async () => {
    setLoading(true);
    const payload = { to: link };
    const createdLink = await linksService.createLink(payload);
    setResult(`${window.location.host}/r/${createdLink.shortenedLink}`);
    setLink('');
    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
  };
  return (
    <Box width={'100%'} my={'auto'}>
      <Container>
        <Box display={'flex'} alignItems={'center'} flexDirection={'column'}>
          <Typography variant={'h2'}>Shorterino</Typography>
          <Box my={2}>
            <Typography variant={'subtitle1'}>
              Shorterino is a simple link shortener that allows you to control
              and monitor all your links activity. Only if you are registered
              tho. Or just shortify your link here:
            </Typography>
          </Box>
          <Box width={'100%'} display={'flex'} flexDirection={'row'}>
            <Box flexGrow={1} mr={1}>
              <TextField
                variant={'outlined'}
                fullWidth
                label={'Link you want shortify'}
                onChange={handleChange}
                value={link}
                InputProps={{
                  endAdornment: (
                    <div>
                      {link && (
                        <Hidden mdUp>
                          <InputAdornment position="end">
                            <IconButton onClick={shortifyLink} color={'secondary'}>
                              <LinkIcon />
                            </IconButton>
                          </InputAdornment>
                        </Hidden>
                      )}
                    </div>
                  ),
                }}
              />
            </Box>
            <Hidden xsDown>
              <Button onClick={shortifyLink} disabled={loading} variant={'contained'}>
                Shortify
              </Button>
            </Hidden>
          </Box>
          {result && (
            <Box
              width={'auto'}
              position={'relative'}
              mt={4}
              py={2}
              bgcolor={'success.main'}
              color={'white'}
            >
              <Box width={'100%'} pl={2} pr={6}>
                <Typography variant={'subtitle2'} noWrap>

                  {result}
                </Typography>
              </Box>
              <Box
                position={'absolute'}
                right={0}
                top={'50%'}
                style={{ transform: 'translateY(-50%)' }}
              >
                <IconButton>
                  <ContentCopy />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default LinkShortener;
