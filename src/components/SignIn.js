import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import useForm from '../hooks/useForm';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: true,
  });
  const { formData, onChange } = useForm({
    username: '',
    password: '',
  });

  const [formError, setFormError] = useState({
    errorUsername: '',
    errorPassword: '',
  });
  const { errorUsername, errorPassword } = formError;

  const { username, password } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    setResponse((prevState) => ({ ...prevState, loading: false }));
    if (response.error) {
      const err = response.error.response.data.errors;
      setFormError({
        errorUsername:
          err[0]?.param === 'username' && err[0].msg !== '' ? err[0].msg : '',
        errorPassword:
          err[0]?.param === 'password' && err[0].msg !== ''
            ? err[0].msg
            : err[1]?.param === 'password' && err[1].msg !== ''
            ? err[1].msg
            : '',
      });
    }
    if (response.data !== null) {
      const userData = {
        user: response.data.user,
        token: response.data.token,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/blog/cms');
    }
  }, [response.data, response.error, navigate]);

  const onSubmit = (e) => {
    setResponse((prevState) => ({ ...prevState, loading: true }));
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/users/sign-in', { username, password })
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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                value={username}
                onChange={onChange}
              />
              <Typography color="error">{errorUsername}</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={onChange}
              />
              <Typography color="error">{errorPassword}</Typography>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;
