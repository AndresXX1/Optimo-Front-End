import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../Redux/reducer/auth';
import Image from 'next/image';
import snfondo from '../../../../public/logos/snfondo.png';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled, useTheme } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import themeConfig from 'src/configs/themeConfig';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import FormHelperText from '@mui/material/FormHelperText';

// Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}));

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.register);
  const router = useRouter();
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError , setPasswordError ] = useState('');
  const [values, setValues] = useState({

    password: '',
    showPassword: false,
    name: '',
    email: '',
    phone: '',
    lastName: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (formSubmitted) {
      if (error) {
        // Mostrar notificación de error solo si hay un error
        toast.error(error, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        // Limpiar inputs solo si el registro es exitoso
        setValues({
          ...values,
          password: '',
          showPassword: false,
          name: '',
          email: '',
          phone: '',
          lastName: '',
        });

        // Mostrar notificación de éxito solo si no hay error
        toast.success('¡Registro exitoso!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Redirigir a /pages/login después de 2 segundos
        setTimeout(() => {
          router.push('/pages/login');
        }, 2000);
      }
    }
  }, [error, formSubmitted]);

  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  useEffect(() => {
    // Verificar si hay al menos un error en los mensajes de error
    const hasError =
      Boolean(nameError) ||
      Boolean(lastNameError) ||
      Boolean(phoneError) ||
      Boolean(emailError) ||
      Boolean(passwordError);
    
    // Actualizar el estado de hasErrors
    setHasErrors(hasError);
  }, [nameError, lastNameError, phoneError, emailError, passwordError]);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleFormSubmit = async () => {
    // Verificar si hay errores antes de enviar el formulario
    if (!hasErrors) {
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone,
        lastName: values.lastName,
      };
  
      if (Object.values(values).some(value => value === '')) {
        // Mostrar notificación si algún campo está vacío
        toast.error('Por favor completa todos los campos.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        try {
          await dispatch(registerUser(userData));
          setFormSubmitted(true); // Marcar el formulario como enviado
        } catch (error) {
          // El manejo de errores se realiza en el useEffect, no es necesario hacer nada aquí
        }
      }
    }
  };

  const handleChange = prop => event => {
    const value = event.target.value;
    setValues({ ...values, [prop]: value });
    
    // Realizar validaciones en tiempo real al cambiar el valor del input
    switch (prop) {
      case 'name':
        setErrors({ ...errors, name: validateName(value) });
        break;
      case 'lastName':
        setErrors({ ...errors, lastName: validateLastName(value) });
        break;
      case 'email':
        setErrors({ ...errors, email: validateEmail(value) });
        break;
      case 'phone':
        setErrors({ ...errors, phone: validatePhoneNumber(value) });
        break;
      case 'password':
        setErrors({ ...errors, password: validatePassword(value) });
        break;
      default:
        break;
    }
  };
  
  const validateName = (value) => {
    if (!value || value.length < 5) {
      return 'El nombre debe tener al menos 5 caracteres';
    }
    if (!/^[A-Z][a-z]*$/.test(value)) {
      return 'El nombre debe comenzar con mayúscula y solo puede contener letras';
    }
    return '';
  };
  
  const validateLastName = (value) => {
    if (!value || value.length < 5) {
      return 'El apellido debe tener al menos 5 caracteres';
    }
    if (!/^[A-Z][a-z]*$/.test(value)) {
      return 'El apellido debe comenzar con mayúscula y solo puede contener letras';
    }
    return '';
  };
  
  const validatePhoneNumber = (value) => {
    if (!value) {
      return '';
    }
    if (!/^\d+$/.test(value)) {
      return 'El teléfono solo puede contener números';
    }
    return '';
  };
  
  const validateEmail = (value) => {
    if (!value) {
      return '';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Ingresa un correo electrónico válido';
    }
    return '';
  };
  
  const validatePassword = (value) => {
    if (!value || value.length < 8) {
      return 'La contraseña debe tener al menos 8 caracteres';
    }
    if (!/[a-zA-Z]/.test(value) || !/\d/.test(value) || !/[!@#$%^&*.-]/.test(value)) {
      return 'La contraseña debe contener al menos una letra, un número y un carácter especial';
    }
    return '';
  };

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", }}>
      <img src="/fondos/fonde.jpg" alt="fondo" style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", zIndex: -1 }} />
      <Box className='content-center'>
        <Card sx={{ zIndex: 1 }}>
          <CardContent sx={{ padding: theme => `${theme.spacing(12, 9, 7)} !important` }}>
            <Image
              src={snfondo}
              alt="Logo"
              width={200}
              height={200}
              style={{
                marginTop:"-90px",
                marginBottom:"-50px",
                marginLeft:"80px"
              }}
            />
            <Box sx={{ mb: 6 }}>
              <Typography variant='h5' sx={{ fontWeight: 600, marginBottom: 1.5 }}>
                Comienza la aventura! 🚀
              </Typography>
              <Typography variant='body2'>¡Haz que la gestión de tu aplicación sea fácil y divertida!</Typography>
            </Box>
            <form noValidate autoComplete='off' onSubmit={e => e.preventDefault()}>
            <TextField
  autoFocus
  fullWidth
  id='name'
  label='Nombre de usuario'
  sx={{ marginBottom: 4 }}
  value={values.name}
  onChange={(e) => {
    setValues({ ...values, name: e.target.value });
    setNameError(validateName(e.target.value));
  }}
  error={Boolean(nameError)}
  helperText={nameError}
/>

<TextField
  fullWidth
  id='lastName'
  label='Apellido'
  sx={{ marginBottom: 4 }}
  value={values.lastName}
  onChange={(e) => {
    setValues({ ...values, lastName: e.target.value });
    setLastNameError(validateLastName(e.target.value));
  }}
  error={Boolean(lastNameError)}
  helperText={lastNameError}
/>

<TextField
  fullWidth
  id='phone'
  label='Teléfono'
  sx={{ marginBottom: 4 }}
  value={values.phone}
  onChange={(e) => {
    setValues({ ...values, phone: e.target.value });
    setPhoneError(validatePhoneNumber(e.target.value));
  }}
  error={Boolean(phoneError)}
  helperText={phoneError}
/>

<TextField
  fullWidth
  id='email'
  label='Email'
  sx={{ marginBottom: 4 }}
  value={values.email}
  onChange={(e) => {
    setValues({ ...values, email: e.target.value });
    setEmailError(validateEmail(e.target.value));
  }}
  error={Boolean(emailError)}
  helperText={emailError}
/>

<FormControl fullWidth>
  <InputLabel htmlFor='auth-register-password'>Contraseña</InputLabel>
  <OutlinedInput
    label='Password'
    value={values.password}
    id='auth-register-password'
    onChange={(e) => {
      setValues({ ...values, password: e.target.value });
      setPasswordError(validatePassword(e.target.value));
    }}
    type={values.showPassword ? 'text' : 'password'}
    endAdornment={
      <InputAdornment position='end'>
        <IconButton
          edge='end'
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          aria-label='toggle password visibility'
        >
          {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
        </IconButton>
      </InputAdornment>
    }
  />
  {passwordError && <FormHelperText error>{passwordError}</FormHelperText>}
              </FormControl>
          <div style={{marginTop:"30px",marginBottom:"20px"}}>
                    <span> Cuando te registras Aceptas </span>
                    <Link href='/' passHref>
                      <LinkStyled onClick={e => e.preventDefault()}>los términos de política y privacidad</LinkStyled>
                    </Link>
                    </div>   
                
              
 <Button
        fullWidth
        size='large'
        variant='contained'
        sx={{ marginBottom: 7 }}
        onClick={handleFormSubmit}
        disabled={hasErrors} // Deshabilitar el botón si hay errores
      >
        Regístrate
      </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Typography variant='body2' sx={{ marginRight: 2 }}>
                  ¿Ya tienes una cuenta?
                </Typography>
                <Typography variant='body2'>
                  <Link passHref href='/pages/login'>
                    <LinkStyled style={{fontSize:"20px"}}>Inicia sesión</LinkStyled>
                  </Link>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
      <ToastContainer />
    </div>
  );
};

RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>;

export default RegisterPage;