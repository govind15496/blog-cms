import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Home from './pages/Home';
import PostInfo from './pages/PostInfo';
import NewPost from './components/post/NewPost';
import PostUpdate from './components/post/PostUpdate';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import './styles/style.css';
import { useEffect } from 'react';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user === undefined) {
      navigate('/blog/cms/sign-in');
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <CssBaseline />
      <NavBar />
      <Container
        sx={{ marginTop: '2rem', paddingBottom: '3rem' }}
        maxWidth="lg"
      >
        <Routes>
          <Route path="/blog/cms" element={<Home />} />
          <Route path="/blog/cms/sign-in" element={<SignIn />} />
          <Route path="/blog/cms/new-post" element={<NewPost />} />
          <Route path="/blog/cms/post/:id" element={<PostInfo />} />
          <Route path="/blog/cms/post/:id/update" element={<PostUpdate />} />
          <Route path="*" element={<Navigate to="/blog/cms" replace />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
