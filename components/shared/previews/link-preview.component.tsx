import { CardMedia, Skeleton } from '@mui/material';
import { FC } from 'react';
import { useQuery } from 'react-query';
import previewService from '../../../services/preview.service';

type IProps = {
  url: string;
  id: string;
};

const LinkPreview: FC<IProps> = ({ url, id }) => {
  const { data, isLoading } = useQuery(
    ['POST/Meta', id],
    async () => await previewService.getLinkMeta(url)
  );

  return isLoading ? (
    <Skeleton height={300} variant="rectangular" animation="wave" />
  ) : (
    <CardMedia>
      <a
        style={{ width: '100%', display: 'block' }}
        href={data.hostname}
        target="_blank"
        rel="noopener noreferrer"
      >
        {url.length ? (
          <img src={data.image} alt="cover" style={{ width: '100%' }} />
        ) : (
          <Skeleton height={300} variant="rectangular" animation={false} />
        )}
      </a>
    </CardMedia>
  );
};

export default LinkPreview;
