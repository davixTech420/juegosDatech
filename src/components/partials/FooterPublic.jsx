import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';

const FooterPublic = () => {
  return (
    <Box
      component="footer"
      sx={{
        borderRadius:2,
        backgroundColor: 'black', // Púrpura oscuro
        color: '#FFFFFF', // Blanco
        py: 4,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We are dedicated to providing the best service and experience. Contact us for more information.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            <Link href="#" color="inherit" variant="body2" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block" sx={{ mb: 1 }}>
              About
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block" sx={{ mb: 1 }}>
              Services
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="#" color="inherit" variant="body2" display="block" sx={{ mb: 1 }}>
              Facebook
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block" sx={{ mb: 1 }}>
              Twitter
            </Link>
            <Link href="#" color="inherit" variant="body2" display="block" sx={{ mb: 1 }}>
              Instagram
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              1234 Main St
              <br />
              Anytown, USA
              <br />
              (123) 456-7890
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Box
        sx={{
          borderTop: '1px solid #FFFFFF', // Borde blanco
          pt: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default FooterPublic;