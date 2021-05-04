import { makeStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles';
import { DataGrid, GridColDef, GridRowsProp } from '@material-ui/data-grid';
import React from 'react';

import CustomPagination from './components/Pagination';

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    borderLeft: 0,
    borderRight: 0,
    borderBottom: 0,
    [theme.breakpoints.down('sm')]: {
      height: 300,
    },
  },
}));

const DataTable = ({
  rows,
  columns,
}: {
  rows: GridRowsProp[];
  columns: GridColDef[];
}): JSX.Element => {
  const classes = useStyles();
  return (
    <DataGrid
      hideFooterRowCount
      hideFooterSelectedRowCount
      className={classes.tableContainer}
      rows={rows}
      columns={columns}
      pagination
      autoPageSize
      components={{ Pagination: CustomPagination }}
      getRowId={row => row.name}
    />
  );
};

export default DataTable;
