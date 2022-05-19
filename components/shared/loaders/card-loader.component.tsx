import { Card, CardActions, CardHeader, Skeleton } from '@mui/material';

const CardLoader = () => {
  return (
    <Card variant="outlined" sx={{ minHeight: '100%' }}>
      <CardHeader
        title={
          <Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardActions>
        <Skeleton variant="rectangular" height={30} width={80} />
      </CardActions>
    </Card>
  );
};

export default CardLoader;
