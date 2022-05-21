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
  cta?: string;
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
          {cta ? <Button disabled={disableCta}>{cta}</Button> : null}
        </Stack>
        <Divider />
        <Grid
          container
          paddingTop={2}
          spacing={2}
          sx={{ width: '100%', flexGrow: 1 }}
        >
          {children}
        </Grid>
      </Container>
    </section>
  );
};

export default QuickViewSection;
