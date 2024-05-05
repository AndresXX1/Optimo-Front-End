import { useState, Fragment, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link';

import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountOutline from 'mdi-material-ui/AccountOutline'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import LogoutVariant from 'mdi-material-ui/LogoutVariant'

// Styled Components
const BadgeContentSpan = styled('span')(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`
}))

const UserDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const router = useRouter()

  const handleDropdownOpen = event => {
    setAnchorEl(event.currentTarget)
  }
  
  const handleDropdownClose = url => {
    if (url) {
      router.push(url)
    }
    setAnchorEl(null)
  }

  // Usamos useEffect para obtener la ruta actual cuando el componente se monta
  const [currentPath, setCurrentPath] = useState('');
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  // Función para obtener la ruta del perfil según la ubicación actual
  const getProfileRoute = () => {
    if (currentPath.startsWith('/Admin')) {
      return '/Admin/perfilUser';
    } else if (currentPath.startsWith('/Cliente')) {
      return '/Cliente/perfilUsers';
    } else {
      return ''; 
    }
  };

  const getConfProfileRoute = () => {
    if (currentPath.startsWith('/Admin')) {
      return '/Admin/Config-User/';
    } else if (currentPath.startsWith('/Cliente')) {
      return '/Cliente/Config-User/';
    } else {
      return ''; 
    }
  };

  const styles = {
    py: 2,
    px: 4,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: 'text.primary',
    textDecoration: 'transparent',
    '& svg': {
      fontSize: '1.375rem',
      color: 'text.secondary'
    }
  }

  return (
    <Fragment>
      <Badge
        overlap='circular'
        onClick={handleDropdownOpen}
        sx={{ ml: 2, cursor: 'pointer' }}
        badgeContent={<BadgeContentSpan />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <AccountCircleIcon sx={{ width: '2.5rem', height: '2.5rem' }}/>
      </Badge>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ '& .MuiMenu-paper': { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge
              overlap='circular'
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <AccountCircleIcon sx={{ width: '2.5rem', height: '2.5rem' }}/>
            </Badge>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Link href={getProfileRoute()} passHref>
            <Box sx={styles}>
              <AccountOutline sx={{ marginRight: 2 }} />
              Profile
            </Box>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
        <Link href={getConfProfileRoute()} passHref>
            <Box sx={styles}>
              <AccountOutline sx={{ marginRight: 2 }} />
              Configuraciones
            </Box>
          </Link>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem sx={{ py: 2 }} onClick={() => handleDropdownClose('/pages/login')}>
          <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary' }} />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;