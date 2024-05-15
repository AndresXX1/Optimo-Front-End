import { useState, useEffect } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import {  ToastContainer } from 'react-toastify'; 

// ** Redux Imports
import { useDispatch } from 'react-redux';
import { changePassword } from '../../Redux/reducer/updateUser';

const TabSecurity = () => {
  const dispatch = useDispatch();

  // ** States
  const [values, setValues] = useState({
    newPassword: '',
    currentPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showCurrentPassword: false,
    showConfirmNewPassword: false,
    newPasswordError: '',
    confirmPasswordError: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (token) {
      console.log('Token sin codificar:', token);
    } else {
      console.log('No se encontró el token sin codificar en el localStorage.');
    }
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Verifica si las contraseñas coinciden
    if (values.newPassword === values.confirmNewPassword) {
      // Construye el objeto con la contraseña antigua y la nueva contraseña
      const passwordData = {
        oldestPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
  
      try {
        // Envía la acción para cambiar la contraseña
        const response = await dispatch(changePassword(passwordData));
  
        // Verifica si la solicitud ha tenido éxito (código de estado 200)
        if (response.meta.requestStatus === 'fulfilled') {
          // Mostrar notificación de éxito solo si no hay error 400
          toast.success('Contraseña cambiada exitosamente');
        } else {
          // Mostrar notificación de error si la solicitud no tuvo éxito
          toast.error('Ha ocurrido un error al cambiar la contraseña');
        }
      } catch (error) {
        // Verifica si el error es debido a una contraseña incorrecta (400)
        if (error.message === 'Request failed with status code 400') {
          // Si es así, muestra una notificación de error específica
          toast.error('Contraseña actual incorrecta');
        } else {
          // Si no, muestra una notificación de error genérica
          toast.error('Ha ocurrido un error al cambiar la contraseña');
        }
      }
    } else {
      // Si las contraseñas no coinciden, mostrar una notificación de error
      toast.error('Las contraseñas no coinciden');
    }
  };

  const handleCurrentPasswordChange = (prop) => (event) => {
    console.log('Valor ingresado:', event.target.value); // Agrega esto para depurar
    setValues({...values, [prop]: event.target.value });
  };


  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };

  const handleMouseDownCurrentPassword = (event) => {
    event.preventDefault();
  };

  // Handle New Password

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  // Handle Confirm New Password
  const handleConfirmNewPasswordChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword });
  };

  const handleMouseDownConfirmNewPassword = (event) => {
    event.preventDefault();
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

  const handleNewPasswordChange = (event) => {
    const newValue = event.target.value;
    const error = validatePassword(newValue);
    setValues(prevValues => ({...prevValues, newPassword: newValue, newPasswordError: error }));
  };

  const handleConfirmPasswordChange = (event) => {
    const newValue = event.target.value;
    const error = newValue!== values.newPassword? 'Las contraseñas no coinciden' : '';
    setValues(prevValues => ({...prevValues, confirmNewPassword: newValue, confirmPasswordError: error }));
  };

  return (
    <form onSubmit={handleSubmit}>
       <ToastContainer />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
            <Typography>
              <h2>Cambio de contraseña</h2>
            </Typography>
            <Grid container spacing={5}>
              <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='account-settings-current-password'>Current Password</InputLabel>
                  <OutlinedInput
                    label='Current Password'
                    value={values.currentPassword}
                    id='account-settings-current-password'
                    type={values.showCurrentPassword ? 'text' : 'password'}
                    onChange={handleCurrentPasswordChange('currentPassword')}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          aria-label='toggle password visibility'
                          onClick={handleClickShowCurrentPassword}
                          onMouseDown={handleMouseDownCurrentPassword}
                        >
                          {values.showCurrentPassword ? <EyeOutline /> : <EyeOffOutline />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sx={{ marginTop: 6 }}>
        <FormControl fullWidth error={Boolean(values.newPasswordError)}>
          <InputLabel htmlFor='account-settings-new-password'>New Password</InputLabel>
          <OutlinedInput
            label='New Password'
            value={values.newPassword}
            id='account-settings-new-password'
            onChange={handleNewPasswordChange}
            type={values.showNewPassword? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={handleClickShowNewPassword}
                  onMouseDown={handleMouseDownNewPassword}
                >
                  {values.showNewPassword? <EyeOutline /> : <EyeOffOutline />}
                </IconButton>
              </InputAdornment>
            }
          />
          {values.newPasswordError && <FormHelperText>{values.newPasswordError}</FormHelperText>}
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth error={Boolean(values.confirmPasswordError)}>
          <InputLabel htmlFor='account-settings-confirm-new-password'>Confirm New Password</InputLabel>
          <OutlinedInput
            label='Confirm New Password'
            value={values.confirmNewPassword}
            id='account-settings-confirm-new-password'
            onChange={handleConfirmPasswordChange}
            type={values.showConfirmNewPassword? 'text' : 'password'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  edge='end'
                  onClick={handleClickShowConfirmNewPassword}
                  onMouseDown={handleMouseDownConfirmNewPassword}
                >
                  {values.showConfirmNewPassword? <EyeOutline /> : <EyeOffOutline />}
                </IconButton>
              </InputAdornment>
            }
          />
          {values.confirmPasswordError && <FormHelperText>{values.confirmPasswordError}</FormHelperText>}
        </FormControl>
      </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            xs={12}
            sx={{ display: 'flex', marginTop: [7.5, 2.5], alignItems: 'center', justifyContent: 'center' }}
          >
            <img width={183} alt='avatar' height={256} src='/images/pages/pose-m-1.png' />
          </Grid>
        </Grid>
      </CardContent>
      <Box sx={{ mt: 11, marginBottom:"20px", marginLeft:"40px"}}>
        <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
          Save Changes
        </Button>
        <Button
          type='reset'
          variant='outlined'
          color='secondary'
          onClick={() => setValues({ ...values, currentPassword: '', newPassword: '', confirmNewPassword: '' })}
        >
          Reset
        </Button>

      </Box>
    </form>
  );
};

export default TabSecurity;
