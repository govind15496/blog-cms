import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';

import signOut from '../utils/signOut';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBlock: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const StyledLogoButton = styled(StyledButton)(({ theme }) => ({
  display: 'none',
  fontSize: '2rem',
  paddingBlock: theme.spacing(0),
  textTransform: 'none',
}));

function Navbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <StyledToolbar>
        <StyledLogoButton
          sx={{ display: { sm: 'block' } }}
          component={Link}
          to={
            user === null || user === undefined
              ? '/blog/cms/sign-in'
              : '/blog/cms'
          }
        >
          Blog
        </StyledLogoButton>
        <StyledLogoButton
          sx={{ display: { xs: 'block', sm: 'none' } }}
          component={Link}
          to={'/blog/cms'}
        >
          B
        </StyledLogoButton>
        <Box>
          {user === null || user === undefined ? (
            <StyledButton
              variant="outlined"
              component={Link}
              to={'/blog/cms/sign-in'}
            >
              Sign In
            </StyledButton>
          ) : (
            <StyledButton
              variant="outlined"
              onClick={() => {
                signOut();
                navigate('/blog/cms/sign-in');
              }}
            >
              Sign Out
            </StyledButton>
          )}
        </Box>
      </StyledToolbar>
    </AppBar>
  );
}

export default Navbar;
