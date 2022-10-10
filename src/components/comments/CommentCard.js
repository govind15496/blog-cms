import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import axios from 'axios';
import { useState } from 'react';
import config from '../../utils/config';

function CommentCard({
  commentId,
  commentUsername,
  commentComment,
  commentCreatedAt,
}) {
  const [response, setResponse] = useState({
    data: null,
    error: null,
    loading: true,
  });

  const onDelete = () => {
    axios
      .delete(`http://localhost:8080/api/comments/${commentId}`, config)
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
    window.location.reload();
  };

  return (
    <Card sx={{ minWidth: 275, marginBottom: '0.5rem' }}>
      <Box align="right" sx={{ margin: 1 }}>
        <Button variant="contained" color="error" onClick={onDelete}>
          Delete
        </Button>
      </Box>

      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {commentUsername}
        </Typography>
        <Typography variant="h6" component="h5">
          {commentComment}
        </Typography>
        <Typography variant="body2">{commentCreatedAt}</Typography>
      </CardContent>
    </Card>
  );
}

export default CommentCard;
