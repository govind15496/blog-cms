import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import useGet from '../hooks/useGet';
import signOut from '../utils/signOut';
import { useEffect, useState } from 'react';

import PostCard from '../components/post/PostCard';

const StyledBoxMain = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

function Home() {
  const [filterPosts, setFilterPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const { data, error, loading } = useGet('http://localhost:8080/api/posts/');
  const navigate = useNavigate();
  const posts = data?.posts;

  const allPublished = () => {
    setFilterPosts([...posts.filter((post) => post.published !== false)]);
  };

  const notPublished = () => {
    setFilterPosts([...posts.filter((post) => post.published !== true)]);
  };

  useEffect(() => {
    if (error?.message === 'Network Error') {
      signOut();
      navigate('/blog/cms/sign-in');
    }
  }, [data, error, loading, navigate, filterPosts]);

  if (loading) {
    return (
      <StyledBoxMain
        component={'main'}
        sx={{
          display: loading ? 'flex' : 'flexbox',
        }}
      >
        {loading ? (
          <Box color="success">
            <CircularProgress />
          </Box>
        ) : null}
      </StyledBoxMain>
    );
  }

  if (error) {
    return (
      <StyledBoxMain
        component={'main'}
        sx={{
          display: error ? 'flex' : 'flexbox',
        }}
      >
        {error ? (
          <Typography variant="h6" color="primary">
            Failed to fetch
          </Typography>
        ) : null}
      </StyledBoxMain>
    );
  }

  return (
    <StyledBoxMain component={'main'}>
      <Typography variant="h6" align="center" gutterBottom>
        Welcome {user && user.user.status + ', '}
        {user && user.user.username}
      </Typography>
      <ButtonGroup align="center" fullWidth sx={{ marginBottom: 2 }}>
        <Button variant="contained" onClick={allPublished}>
          All Published Posts
        </Button>
        <Button variant="contained" component={Link} to={'/blog/cms/new-post'}>
          New Post
        </Button>
        <Button variant="contained" onClick={notPublished}>
          All Unpublished Posts
        </Button>
      </ButtonGroup>

      {posts && (
        <Grid container spacing={4}>
          {filterPosts.map((post, index) => {
            return (
              <PostCard
                key={post._id}
                postTitle={post.title}
                postCreatedDate={new Date(post.createdAt).toDateString()}
                postContent={post.content}
                postLink={`/blog/cms/post/${post._id}`}
              />
            );
          })}
        </Grid>
      )}
    </StyledBoxMain>
  );
}

export default Home;
