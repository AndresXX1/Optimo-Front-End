import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import snfondo from '../../../../public/logos/snfondo.png';

// ** MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ** Icons Imports

import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';


// ** Configs
import themeConfig from 'src/configs/themeConfig';

// ** Layout Import

import BlankLayout from 'src/@core/layouts/BlankLayout';

// ** Redux Action Import

import { loginUser, clearAuthState} from '../../../Redux/reducer/auth';


// ** Styled Components

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));


const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  '&.MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }

}));


const LoginPage = () => {
  const authState = useSelector(state => state.register); // Actualiza esto si cambias el nombre del reducer a 'register'
  const [redirected, setRedirected] = useState(false);
  const [userRole, setUserRole] = useState(null);



  const [values, setValues] = useState({

    email: '',
    password: '',
    showPassword: false
  });

  


  const theme = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    console.log("authState:", authState); // Verificar el valor de authState
    if (authState && authState.decodedToken && authState.decodedToken.role) {
      console.log("Role encontrado:", authState.decodedToken.role);
      setUserRole(authState.decodedToken.role);
      
      // Verificar si se debe redirigir y solo si no se ha redirigido antes
      if (!redirected) {
        setRedirected(true);
        if (authState.decodedToken.role === 'user') {
          router.push('/Cliente');
        } else if (authState.decodedToken.role === 'admin') {
          router.push('/Admin');
        } else {
          console.log('Usuario sin rol válido');
        }
      }
    }
  }, [authState, redirected, router]);

  useEffect(() => {
    console.log("userRole:", userRole); // Agregar este console.log para verificar el valor de userRole
  }, [userRole]);

  useEffect(() => {
    // Limpiar el estado una vez que se ha guardado el token en localStorage
    if (localStorage.getItem('authToken')) {
      setValues({
        email: '',
        password: '',
        showPassword: false
      });
    }
  }, [authState]);

  const handleChange = prop => event => {
    setValues({...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({...values, showPassword:!values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email: values.email, password: values.password }));
     
      localStorage.setItem('authToken', authState.token);
     
      dispatch(clearAuthState());
    
      toast.success('¡Inicio de sesión exitoso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
     
      toast.error('Error al iniciar sesión. Por favor, verifica tus credenciales.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", }}>
      <img src="/fondos/fonde.jpg" alt="fondo" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", zIndex: -1 }} />
      <Box className='content-center' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)}important` }}>
          <ToastContainer />
            <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                src={snfondo}
                alt="Logo"
                width={200}
                height={200}
                style={{
                  marginTop:"-50px",
                  marginBottom:"-50px",
                  marginLeft:"0px"
                }}
              />
            </Box>
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Bienvenidos a {themeConfig.templateName} 👋🏻
              </Typography>
              <Typography variant='body2'>Por favor inicia sesión para comenzar la aventura :D</Typography>
            </Box>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                autoFocus
                fullWidth
                id='email'
                label='E-mail'
                sx={{ marginBottom: 4 }}
                value={values.email}
                onChange={handleChange('email')}
              />
              <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <InputLabel htmlFor='auth-login-password'>Contraseña</InputLabel>
                <OutlinedInput
                  label='Password'
                  value={values.password}
                  id='auth-login-password'
                  onChange={handleChange('password')}
                  type={values.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>

                      <IconButton
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        aria-label='toggle password visibility'
                      >

                        {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Box
                sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
              >
                <FormControlLabel control={<Checkbox />} label='Guardar datos de inicio de sesión' />
                <Link passHref href='/'>
                  <Typography component="a" variant="body2" onClick={(e) => e.preventDefault()}>
                    Olvidaste tu contraseña?
                  </Typography>
                </Link>
              </Box>
           
              <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ marginBottom: 7 }}
                type="submit"
              >
                Login
              </Button>
             
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: 2 }}>
                  Nuevo en la plataforma?
                </Typography>
                <Typography variant='body2'>
                <Link passHref href='/pages/register'>
                <Typography component="a" variant="body2" style={{ fontSize: "20px",color:"green" }}>
                    Regístrate!
                </Typography>
                </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
       
      </Box>
    </div>
  )
}
LoginPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default LoginPage;