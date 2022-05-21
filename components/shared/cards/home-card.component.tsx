import { Delete, MoreVert } from '@mui/icons-material';
import {
  Card,
  CardHeader,
  Stack,
  Typography,
  CardActions,
  Button,
  Divider,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon
} from '@mui/material';
import { FC, useState } from 'react';
import LinkPreview from '../previews/link-preview.component';

type IProps = {
  title: string;
  subtitle: Date;
  url: string;
  id: string;
  handleDelete: (value: any) => void;
};

const HomeCard: FC<IProps> = ({ title, subtitle, url, id, handleDelete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  return (
    <Card variant="outlined" sx={{ height: 586 }}>
      <Menu
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        open={open}
        id={`${title}-menu`}
      >
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <Delete color="error" />
          </ListItemIcon>
          <Typography variant="inherit">Delete</Typography>
        </MenuItem>
      </Menu>
      <LinkPreview url={url} id={id} />

      <CardHeader
        title={
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <div>
              <Typography variant="h6">{title}</Typography>
              <Chip
                label={`Added On: 
                ${new Date(subtitle).toDateString()}`}
              />
            </div>
          </Stack>
        }
      />
      <Divider />
      <CardActions>
        <Stack flexGrow={1} direction="row" justifyContent="space-between">
          <Button variant="outlined">View Home</Button>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default HomeCard;
