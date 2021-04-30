import { Box, Hidden, makeStyles, Typography } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { useGridSlotComponentProps } from '@material-ui/data-grid';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  paginationContainer: {
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
}));

const CustomPagination = (): JSX.Element => {
  const { state, apiRef } = useGridSlotComponentProps();
  const classes = useStyles();

  return (
    <Box className={classes.paginationContainer} alignItems={'center'} width={'100%'} display={'flex'}>
      <Hidden smDown>
        <Box textAlign={'left'} flexGrow={1}>
          <Typography color={'textSecondary'} variant={'subtitle2'}>
            Showing {state.pagination.page * state.pagination.pageSize + 1} -{' '}
            {state.pagination.page + 1 !== state.pagination.pageCount
              ? (state.pagination.page + 1) * state.pagination.pageSize
              : state.pagination.rowCount}{' '}
            of {state.pagination.rowCount}
          </Typography>
        </Box>
      </Hidden>
      <Pagination
        color="primary"
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
        shape={'rounded'}
      />
    </Box>
  );
};

export default CustomPagination;
