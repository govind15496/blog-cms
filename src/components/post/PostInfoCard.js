import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import CommentIcon from '@mui/icons-material/Comment';
import Avatar from '@mui/material/Avatar';

import CommentCard from '../comments/CommentCard';

import { useState, useEffect } from 'react';
import useForm from '../../hooks/useForm';
import axios from 'axios';
import config from '../../utils/config';

function capitalizeFirstLetter(string) {
  // eslint-disable-next-line eqeqeq
  if (string == null || string == undefined) {
    return string;
  } else {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}

function PostInfoCard({
  postTitle,
  postCreatedDate,
  postUpdatedDate,
  postAuthor,
  postContent,
  postComments,
}) {
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: true,
  });

  const id = useParams().id;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')).user;

  const { formData, onChange } = useForm({
    username: user ? user.username : '',
    comment: '',
  });

  const [formError, setFormError] = useState({
    errorUsername: '',
    errorComment: '',
  });

  const { username, comment } = formData;
  const { errorUsername, errorComment } = formError;

  useEffect(() => {
    setResponse((prevState) => ({ ...prevState, loading: false }));
    if (response.error) {
      const errors = response?.error?.response?.data?.errors;
      setFormError({
        errorUsername:
          errors[0]?.param === 'username' && errors[0].msg !== ''
            ? errors[0].msg
            : errors[1]?.param === 'username' && errors[1].msg !== ''
            ? errors[1].msg
            : '',
        errorComment:
          errors[0]?.param === 'comment' && errors[0].msg !== ''
            ? errors[0].msg
            : errors[1]?.param === 'comment' && errors[1].msg !== ''
            ? errors[1].msg
            : '',
      });
    }

    if (response.data !== null) {
      window.location.reload();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postComments, response.data, id]);

  const onSubmit = (e) => {
    setResponse((prevState) => ({ ...prevState, loading: true }));
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/comments/${id}`, formData)
      .then((res) => {
        setResponse((prevState) => ({
          ...prevState,
          data: res.data,
          error: null,
        }));
      })
      .catch((err) => {
        setResponse((prevState) => ({ ...prevState, error: err, data: null }));
      })
      .finally(setResponse((prevState) => ({ ...prevState, loading: false })));
  };

  const onDelete = () => {
    axios
      .delete(`http://localhost:8080/api/posts/${id}`, config)
      .then((res) => {
        setResponse((prevState) => ({
          ...prevState,
          data: res.data,
          error: null,
        }));
      })
      .catch((err) => {
        setResponse((prevState) => ({ ...prevState, error: err, data: null }));
      })
      .finally(setResponse((prevState) => ({ ...prevState, loading: false })));
    navigate('/blog/cms/');
  };

  return (
    <>
      <Card sx={{ maxWidth: '100%' }}>
        <CardMedia
          component="img"
          height="140"
          image="https://st2.depositphotos.com/1420973/6409/i/600/depositphotos_64095317-stock-photo-blog-concept-cloud-chart-print.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="h3">
            {postTitle}
          </Typography>
          <Typography gutterBottom component="span" sx={{ marginRight: 1 }}>
            By:
          </Typography>
          <Typography gutterBottom component="span" fontWeight={'bold'}>
            {capitalizeFirstLetter(postAuthor)}
          </Typography>
          <Box sx={{ marginBlock: 1 }}>
            <Divider variant="fullWidth" />
          </Box>
          <Typography variant="body2" component={'span'} color="text.secondary">
            Created: {postCreatedDate}
          </Typography>
          <Typography component={'span'} sx={{ marginInline: 1 }}>
            |
          </Typography>
          <Typography variant="body2" component={'span'}>
            Updated: {postUpdatedDate}
          </Typography>
          <Box sx={{ marginBlock: 1 }}></Box>
          <Typography variant="body2" color="text.secondary">
            {postContent}
          </Typography>
        </CardContent>
        <Box align="right" sx={{ marginBottom: 1, marginRight: 1 }}>
          <Button
            variant="contained"
            color="success"
            component={Link}
            to={`/blog/cms/post/${id}/update`}
          >
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{ marginLeft: 1 }}
            onClick={onDelete}
          >
            Delete
          </Button>
        </Box>
      </Card>
      <Container component="section" maxWidth="xs">
        <Box
          sx={{
            marginBlock: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <CommentIcon />
          </Avatar>
          <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  onChange={onChange}
                  value={username}
                />
                <Typography color="error">{errorUsername}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  margin="normal"
                  required
                  fullWidth
                  id="comment"
                  label="Comment"
                  name="comment"
                  multiline
                  onChange={onChange}
                  value={comment}
                />
                <Typography color="error">{errorComment}</Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Comment
            </Button>
          </Box>
        </Box>
      </Container>
      <Typography
        variant="body1"
        component={'h6'}
        gutterBottom
        sx={{ marginLeft: 2 }}
      >
        Comments ({postComments?.length})
      </Typography>
      {postComments?.length > 0
        ? postComments.map((comment, index) => {
            return (
              <CommentCard
                key={comment._id}
                commentId={comment._id}
                commentUsername={comment.username}
                commentComment={comment.comment}
                commentCreatedAt={new Date(comment.createdAt).toDateString()}
              />
            );
          })
        : null}
    </>
  );
}

export default PostInfoCard;
