import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import config from '../../utils/config';

function PostUpdate() {
  const id = useParams().id;
  const navigate = useNavigate();

  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: true,
  });

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false,
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const publishedChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      published: e.target.checked,
    }));
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/${id}`).then((res) => {
      setFormData({
        title: res.data.post.title,
        content: res.data.post.content,
        published: res.data.post.published,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [formError, setFormError] = useState({
    errorTitle: '',
    errorContent: '',
  });

  const { errorTitle, errorContent } = formError;

  const { title, content, published } = formData;

  useEffect(() => {
    setResponse((prevState) => ({ ...prevState, loading: false }));
    if (response.error) {
      const err = response?.error?.response?.data?.errors;
      if (err) {
        setFormError({
          errorTitle:
            err[0]?.param === 'title' && err[0].msg !== '' ? err[0].msg : '',
          errorContent:
            err[0]?.param === 'content' && err[0].msg !== ''
              ? err[0].msg
              : err[1]?.param === 'content' && err[1].msg !== ''
              ? err[1].msg
              : '',
        });
      }
    }

    if (response.data !== null) {
      navigate(`/blog/cms/post/${id}`);
    }
  }, [response.data, response.error, navigate, id]);

  const onSubmit = (e) => {
    setResponse((prevState) => ({ ...prevState, loading: true }));
    e.preventDefault();
    axios
      .put(
        `http://localhost:8080/api/posts/${id}`,
        {
          ...formData,
        },
        config
      )
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

  if (response.loading) {
    return (
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Update post
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                value={title}
                onChange={onChange}
              />
              <Typography color="error">{errorTitle}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                required
                fullWidth
                name="content"
                label="Content"
                type="Text"
                id="content"
                margin="normal"
                multiline
                rows={10}
                value={content}
                onChange={onChange}
              />
              <Typography color="error">{errorContent}</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  label="Publish"
                  control={
                    <Checkbox
                      checked={published}
                      value={published}
                      onChange={publishedChange}
                    />
                  }
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Typography align="center" component="h1" variant="h6" color="error">
            {response?.error?.message === 'Network Error'
              ? response?.error?.message
              : null}
            {response?.error?.response?.data === 'Unauthorized'
              ? response?.error?.response?.data
              : null}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default PostUpdate;
