import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';

import { Link } from 'react-router-dom';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

function PostCard({ postTitle, postCreatedDate, postContent, postLink }) {
  return (
    <Grid item xs={12} md={6}>
      <Card sx={{ display: 'flex' }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {postTitle}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {postCreatedDate}
          </Typography>
          <Typography
            variant="subtitle1"
            paragraph
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {postContent}
          </Typography>
          <StyledButton variant="contained" component={Link} to={postLink}>
            Continue reading…
          </StyledButton>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          image={
            'https://st2.depositphotos.com/1420973/6409/i/600/depositphotos_64095317-stock-photo-blog-concept-cloud-chart-print.jpg'
          }
          alt={'post image'}
        />
      </Card>
    </Grid>
  );
}
export default PostCard;
