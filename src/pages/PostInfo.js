import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PostInfoCard from '../components/post/PostInfoCard';

import { useEffect, useState } from 'react';
import useGet from '../hooks/useGet';
import signOut from '../utils/signOut';

const StyledBoxMain = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

function PostInfo() {
  const id = useParams().id;
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  const { data, error, loading } = useGet(
    `http://localhost:8080/api/posts/${id}`
  );

  useEffect(() => {
    if (error?.message === 'Network Error') {
      signOut();
      navigate('/blog/cms/sign-in');
    }

    if (!loading) {
      setPost(data?.post);
    }
  }, [data, error, loading, navigate]);

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
          <Box color="success">
            <CircularProgress />
          </Box>
        ) : null}
      </StyledBoxMain>
    );
  }

  return (
    <Box>
      <StyledBoxMain component={'main'}>
        {post !== undefined || post !== null ? (
          <PostInfoCard
            postTitle={post?.title}
            postCreatedDate={new Date(post?.createdAt).toDateString()}
            postUpdatedDate={new Date(post?.updatedAt).toDateString()}
            postAuthor={post?.author?.username}
            postContent={post?.content}
            postComments={post?.comments}
          />
        ) : (
          'Where is the post?'
        )}
      </StyledBoxMain>
    </Box>
  );
}

export default PostInfo;
