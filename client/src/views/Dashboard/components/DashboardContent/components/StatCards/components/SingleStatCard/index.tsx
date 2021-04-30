import { Box, Icon, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const SingleStatCard = ({
  icon,
  subtitle,
  count,
}: {
  icon: any;
  subtitle: string;
  count: number | string;
}): JSX.Element => {
  const CardIcon = icon;
  return (
    <Paper>
      <Box p={2} display={'flex'} flexDirection={'row'} alignItems={'center'}>
        <Icon color={'secondary'} fontSize={'large'}>
          <CardIcon fontSize={'large'} />
        </Icon>
        <Box textAlign={'start'} ml={2}>
          <Typography color={'textSecondary'} variant={'subtitle2'}>
            {subtitle}
          </Typography>
          <Typography variant={'h6'}>{count}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default SingleStatCard;
