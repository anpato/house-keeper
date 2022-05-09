import {
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Typography,
  Stack,
  CardContent,
  Skeleton,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import { FC, useState } from 'react';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { Delete, MoreVert } from '@mui/icons-material';

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
  onDelete: (value: string) => Promise<void>;
  value?: string;
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
  disableCta,
  onDelete,
  value
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Card variant="outlined" sx={{ minHeight: '100%' }}>
      <CardHeader
        title={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">
              {title} <br />{' '}
              <Typography component="span">{secondaryTitle}</Typography>
            </Typography>
            <Stack direction="row">
              <Typography>
                {subtitleLabel}: <br />
                {new Date(subtitle).toDateString()}
              </Typography>
              <Button
                color="secondary"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <MoreVert />
              </Button>
              <Menu
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
                open={open}
                id={`${title}-menu`}
              >
                <MenuItem onClick={() => onDelete(value ?? '')}>
                  <ListItemIcon>
                    <Delete color="error" />
                  </ListItemIcon>
                  <Typography variant="inherit">Delete</Typography>
                </MenuItem>
              </Menu>
            </Stack>
          </Stack>
        }
      />
      {displayLink ? (
        <CardContent>
          <LinkPreview
            imageHeight={300}
            url={(url && encodeURI(url)) ?? ''}
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
        <Stack flexGrow={1} direction="row" justifyContent="space-between">
          <Button disabled={disableCta}>{cta}</Button>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default QuickView;
