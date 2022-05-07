import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Typography,
  Stack,
  CardContent,
  Skeleton
} from '@mui/material';
import { FC } from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

type IProps = {
  title: string;
  secondaryTitle?: string;
  subtitle: string | Date;
  subtitleLabel: string;
  cta: string;
  ctaLink: string;
  displayLink?: boolean;
  url?: string;
  disableCta?: boolean;
};

const QuickView: FC<IProps> = ({
  title,
  subtitle,
  subtitleLabel,
  cta,
  displayLink,
  url,
  ctaLink,
  secondaryTitle,
  disableCta
}) => {
  return (
    <Card variant="outlined" sx={{ minHeight: '100%' }}>
      <CardHeader
        title={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography>
              {title} <br /> {secondaryTitle}
            </Typography>
            <Typography>
              {subtitleLabel}: <br />
              {new Date(subtitle).toDateString()}
            </Typography>
          </Stack>
        }
      />
      {displayLink ? (
        <CardContent>
          <LinkPreview
            imageHeight={300}
            url={url ?? ''}
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
        </CardContent>
      ) : null}
      <Divider />
      <CardActions>
        <Button disabled={disableCta}>{cta}</Button>
      </CardActions>
    </Card>
  );
};

export default QuickView;
