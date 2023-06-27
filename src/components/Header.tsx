import React from 'react';
import { Link } from 'react-router-dom';

import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: {xs: 'flex', md: 'none'} }}>
            <IconButton
              size="large"
              aria-label=""
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem
                component={Link} 
                to="/" 
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              <MenuItem
                component={Link} 
                to="/data" 
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">Data</Typography>
              </MenuItem>
              <MenuItem
                component={Link} 
                to="/file" 
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">File</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button 
              component={Link} 
              to="/" 
              onClick={handleCloseNavMenu} 
              sx={{ my: 2, color: 'white', display: 'block'}}
            >
              Home
            </Button>
            <Button 
              component={Link} 
              to="/data" 
              onClick={handleCloseNavMenu} 
              sx={{ my: 2, color: 'white', display: 'block'}}
            >
              Data
            </Button>
            <Button 
              component={Link} 
              to="/file" 
              onClick={handleCloseNavMenu} 
              sx={{ my: 2, color: 'white', display: 'block'}}
            >
              File
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;