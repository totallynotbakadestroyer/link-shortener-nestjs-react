import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../../../store';
import DashboardContent from '../DashboardContent';

const SummaryStats = (): JSX.Element => {
  const links = useSelector((state: RootState) => state.links);

  if (!links.linksInfo && links.loading) {
    return <CircularProgress />;
  }

  return (
    <DashboardContent linksInfo={links.linksInfo} loading={links.loading} />
  );
};

export default SummaryStats;
