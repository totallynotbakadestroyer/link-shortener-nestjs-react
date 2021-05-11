import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { linksService } from '../../../../services/links.service';
import DashboardContent from '../DashboardContent';

const LinkSummary = (): JSX.Element => {
  const [linkInfo, setLinkInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id }: { id: any } = useParams();

  useEffect(() => {
    const getLinkInfo = async () => {
      const data: any = await linksService.getLinkInfo(id);
      setLinkInfo(data);
      setLoading(false);
    };
    getLinkInfo();
  }, [id]);

  if (!linkInfo && loading) return <CircularProgress />;

  return <DashboardContent linksInfo={linkInfo} loading={loading} />;
};

export default LinkSummary;
