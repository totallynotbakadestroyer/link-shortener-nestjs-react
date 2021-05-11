import {
  Box,
  CircularProgress,
  List,
  ListItem,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    maxHeight: 300,
    backgroundColor: theme.palette.background.paper,
  },
}));

const LinksBox = (): JSX.Element | null => {
  const classes = useStyles();

  const links = useSelector((state: RootState) => state.links);

  if (!links.linksInfo && links.loading) {
    return <CircularProgress />;
  }

  return (
    <div className={classes.root}>
      <List>
        {links.linksInfo.links.map(link => (
          <ListItem
            key={link.id}
            button
            component={Link}
            to={`/dashboard/links/${link.id}`}
          >
            <Box width={'100%'}>
              <Typography>{moment(link.createdAt).format('ll')}</Typography>
              <Typography noWrap variant={'subtitle2'}>
                {link.to}
              </Typography>
              <Box width={'100%'} mt={1} display={'flex'}>
                <Box flexGrow={1} width={'60%'}>
                  <Typography noWrap variant={'body2'}>
                    {window.location.host}/{link.shortenedLink}
                  </Typography>
                </Box>
                <Box display={'flex'} alignContent={'center'} flexGrow={1}>
                  <Box mr={1}>
                    <BarChartIcon />
                  </Box>
                  <Typography variant={'body2'}>
                    {link.visitorsCount}{' '}
                    {link.visitorsCount === 1 ? 'click' : 'clicks'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default LinksBox;