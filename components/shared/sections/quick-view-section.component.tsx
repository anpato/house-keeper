import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { FC, ReactElement } from 'react';

type IProps = {
  children?: ReactElement | ReactElement[];
  title: string;
  cta: string;
  ctaAction?: () => void;
  disableCta?: boolean;
};

const QuickViewSection: FC<IProps> = ({
  children,
  title,
  cta,
  ctaAction,
  disableCta
}) => {
  return (
    <section style={{ marginTop: '2em' }}>
      <Container>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          gap={2}
        >
          <Typography variant="h5">{title}</Typography>
          <Button disabled={disableCta}>{cta}</Button>
        </Stack>
        <Divider />
        <Grid
          container
          gap={2}
          columns={4}
          sx={{
            marginTop: '1em'
          }}
        >
          {children}
        </Grid>
      </Container>
    </section>
  );
};

export default QuickViewSection;
