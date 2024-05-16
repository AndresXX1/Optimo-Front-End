import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { changeEmail } from '../../Redux/reducer/updateUser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../../Components/localStore/authContext";
import { useRouter } from 'next/router';
import LogoutVariant from 'mdi-material-ui/LogoutVariant';

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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

const TabEmailChange = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth();
  const router = useRouter();

  // ** States
  const [values, setValues] = useState({
    newEmail: '',
    currentPassword: '',
    showCurrentPassword: false,
    emailError: '',
  });
  const [open, setOpen] = useState(false);

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
  
    const emailData = {
      newEmail: values.newEmail,
      password: values.currentPassword,
    };

    console.log('Datos enviados:', emailData);
  
    try {
      const response = await dispatch(changeEmail(emailData));
  
      if (response.meta.requestStatus === 'fulfilled') {
        toast.success('Correo electrónico cambiado exitosamente');
        handleClickOpen(); // Abrir el modal después de éxito
      } else {
        toast.error('Ha ocurrido un error al cambiar el correo electrónico');
      }
    } catch (error) {
      if (error.message === 'Request failed with status code 400') {
        toast.error('Contraseña actual incorrecta');
      } else {
        toast.error('Ha ocurrido un error al cambiar el correo electrónico');
      }
    }
  };

  const handleCurrentPasswordChange = (event) => {
    setValues({ ...values, currentPassword: event.target.value });
  };

  const handleNewEmailChange = (event) => {
    setValues({ ...values, newEmail: event.target.value });
  };

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };

  const handleMouseDownCurrentPassword = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = (shouldLogout) => {
    setOpen(false);
    if (shouldLogout) {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('decodedToken');
    router.push('/pages/login');
  };

  return (
    <>
      <ToastContainer />
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ color: "salmon" }} id="alert-dialog-title">{"Aplicar Cambios"}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{ color: "white" }} id="alert-dialog-description">
            Para aplicar los cambios necesitas volver a iniciar sesión.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Más tarde
          </Button>
          <Button onClick={() => handleClose(true)} color="primary">
            <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary', color: "blueviolet" }} />
            Logout
          </Button>
        </DialogActions>
      </Dialog>
      <form onSubmit={handleSubmit}>
        <CardContent sx={{ paddingBottom: 0 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <Typography>
                <h2>Cambio de correo electrónico</h2>
              </Typography>
              <Grid container spacing={5}>
                <Grid item xs={12} sx={{ marginTop: 4.75 }}>
                  <TextField
                    fullWidth
                    id='new-email'
                    label='Nuevo correo electrónico'
                    value={values.newEmail}
                    onChange={handleNewEmailChange}
                    error={Boolean(values.emailError)}
                    helperText={values.emailError}
                  />
                </Grid>
                <Grid item xs={12} sx={{ marginTop: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='account-settings-current-password'>Contraseña Actual</InputLabel>
                    <OutlinedInput
                      label='Contraseña Actual'
                      value={values.currentPassword}
                      id='account-settings-current-password'
                      type={values.showCurrentPassword ? 'text' : 'password'}
                      onChange={handleCurrentPasswordChange}
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
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <Box sx={{ mt: 11, marginBottom: "20px", marginLeft: "40px" }}>
          <Button type='submit' variant='contained' sx={{ marginRight: 3.5 }}>
            Guardar Cambios
          </Button>
          <Button
            type='reset'
            variant='outlined'
            color='secondary'
            onClick={() => setValues({ ...values, currentPassword: '', newEmail: '' })}
          >
            Reiniciar
          </Button>
        </Box>
      </form>
    </>
  );
};

export default TabEmailChange;
