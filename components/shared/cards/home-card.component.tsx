import { LinkPreview } from '@dhaiwat10/react-link-preview';
import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Skeleton,
  CardActions,
  Button,
  CardMedia,
  Divider
} from '@mui/material';
import { FC } from 'react';

type IProps = {
  title: string;
  subtitle: Date;
  url: string;
};

const HomeCard: FC<IProps> = ({ title, subtitle, url }) => {
  return (
    <Card variant="outlined">
      <CardMedia>
        <LinkPreview
          imageHeight={300}
          url={encodeURI(url)}
          customLoader={
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Skeleton
                height={350}
                sx={{ flexGrow: 1, height: '400' }}
                variant="rectangular"
              />
            </a>
          }
          fallback={
            <a href={url} target="_blank" rel="noopener noreferrer">
              <Skeleton
                height={350}
                sx={{ flexGrow: 1, height: '400' }}
                animation={false}
                variant="rectangular"
              />
            </a>
          }
        />
      </CardMedia>
      <CardHeader
        title={
          <Stack>
            <div>
              <Typography variant="h6">{title}</Typography>
              <Typography>
                {' '}
                Added On: {new Date(subtitle).toDateString()}
              </Typography>
            </div>
          </Stack>
        }
      />
      <Divider />
      <CardActions>
        <Button variant="outlined">View Home</Button>
      </CardActions>
    </Card>
  );
};

export default HomeCard;
