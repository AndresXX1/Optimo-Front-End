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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import LogoutVariant from 'mdi-material-ui/LogoutVariant';

// ** Router Import
import { useRouter } from 'next/router';

// ** Redux Imports
import { useDispatch } from 'react-redux';
import { changePassword } from '../../Redux/reducer/updateUser';

// ** Toast Imports
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TabSecurity = () => {
  const dispatch = useDispatch();
  const router = useRouter();

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

  
    if (values.newPassword === values.confirmNewPassword) {
      const passwordData = {
        oldestPassword: values.currentPassword,
        newPassword: values.newPassword,
      };

      try {
    
        const response = await dispatch(changePassword(passwordData));

        
        if (response.meta.requestStatus === 'fulfilled') {
         
          toast.success('Contraseña cambiada exitosamente', {
            onClose: () => handleClickOpen() 
          });
        } else {
         
          toast.error('Ha ocurrido un error al cambiar la contraseña');
        }
      } catch (error) {
       
        if (error.message === 'Request failed with status code 400') {
       
          toast.error('Contraseña actual incorrecta');
        } else {
        
          toast.error('Ha ocurrido un error al cambiar la contraseña');
        }
      }
    } else {
     
      toast.error('Las contraseñas no coinciden');
    }
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

  const handleCurrentPasswordChange = (prop) => (event) => {
    console.log('Valor ingresado:', event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };

  const handleMouseDownCurrentPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
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
    setValues(prevValues => ({ ...prevValues, newPassword: newValue, newPasswordError: error }));
  };

  const handleConfirmPasswordChange = (event) => {
    const newValue = event.target.value;
    const error = newValue !== values.newPassword ? 'Las contraseñas no coinciden' : '';
    setValues(prevValues => ({ ...prevValues, confirmNewPassword: newValue, confirmPasswordError: error }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <ToastContainer />
      <Dialog
        open={open}
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{color:"salmon"}} id="alert-dialog-title">{"Aplicar Cambios"}</DialogTitle>
        <DialogContent>
          <DialogContentText style={{color:"white"}} id="alert-dialog-description">
            Para aplicar los cambios necesitas volver a iniciar sesión.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Mas tarde
          </Button>
          <MenuItem sx={{ py: 2 }} onClick={() => handleClose(true)}>
            <LogoutVariant sx={{ marginRight: 2, fontSize: '1.375rem', color: 'text.secondary',color:"blueviolet" }} />
            Logout
          </MenuItem>
        </DialogActions>
      </Dialog>

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
                    type={values.showNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowNewPassword}
                          onMouseDown={handleMouseDownNewPassword}
                        >
                          {values.showNewPassword ? <EyeOutline /> : <EyeOffOutline />}
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
                    type={values.showConfirmNewPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onClick={handleClickShowConfirmNewPassword}
                          onMouseDown={handleMouseDownConfirmNewPassword}
                        >
                          {values.showConfirmNewPassword ? <EyeOutline /> : <EyeOffOutline />}
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
      <Box sx={{ mt: 11, marginBottom: "20px", marginLeft: "40px" }}>
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