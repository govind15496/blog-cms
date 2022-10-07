import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

const StyledBoxFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBlock: theme.spacing(1),
}));

const StyledLinkFooter = styled(Link)({
  textDecoration: 'none',
  color: 'inherit',
});

function Footer() {
  return (
    <StyledBoxFooter component={'footer'}>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        component="span"
        sx={{ marginRight: '0.25rem' }}
      >
        Built by
      </Typography>
      <StyledLinkFooter
        href="https://github.com/Ahmed-Mohadin/"
        target="_blank"
        rel="noreferrer"
      >
        Ahmed Mohadin
      </StyledLinkFooter>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        component="span"
        sx={{ marginInline: '0.25rem' }}
      >
        |
      </Typography>
      <StyledLinkFooter
        href="https://github.com/Ahmed-Mohadin/blog-cms"
        target="_blank"
        rel="noreferrer"
      >
        Source
      </StyledLinkFooter>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
      ></Typography>
    </StyledBoxFooter>
  );
}

export default Footer;
