import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Snackbar, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Container, Typography, TextField, Button, FormControlLabel, Checkbox, Link, Grid } from '@mui/material';


const images = [
  'https://source.unsplash.com/random?wallpapers',

  // Agrega más URLs de imágenes aquí si es necesario

];

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const onSubmit = async (data) => {
    console.log('Datos enviados al backend:', data);
  };

  return (
    <div className="dsaddsadsa">

      <Container component="main" maxWidth="xs" className="borde p-4">
        <LockOutlinedIcon />
        <Typography style={{
          color: "red"
        }} component="h1" variant="h5" className="mb-3">Regístrate como empresa</Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="form">
          <TextField
            autoComplete="given-name"
            name="name"
            required
            fullWidth
            id="name"
            label="First Name"
            autoFocus
            {...register('name', {
              required: '*Campo obligatorio*',
              pattern: {
                value: /^[A-Z][a-z]{0,9}( [A-Z][a-z]{0,9})?$/,
                message: 'El campo nombre debe comenzar con mayúscula y debe contener no más de 10 caracteres. Ejemplo: Juan'
              }
            })}
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
          <TextField
            required
            fullWidth
            id="surName"
            label="Surname"
            name="surName"
            autoComplete="family-name"
            {...register('surName', {
              required: '*Campo obligatorio*',
              pattern: {
                value: /^[A-ZÑñ][a-zñ]{0,9}( [A-ZÑñ][a-zñ]{0,9})?$/,
                message: 'El campo apellido debe comenzar con mayúscula y debe contener no más de 10 caracteres. Ejemplo: Pérez'
              }
            })}
          />
          {errors.surName && <span className="error">{errors.surName.message}</span>}
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            {...register('email', {
              required: '*Campo obligatorio*',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Ingrese una dirección de e-mail válida. Ejemplo: user@example.com'
              }
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
          <div className="passwordInputContainer">
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              {...register('password', {
                required: true,
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[@.])[a-zA-Z0-9@.]{6,12}$/,
                  message: 'La contraseña debe contener de 6 a 12 caracteres e incluir: una mayúscula como primer caracter, una minúscula y un caracter especial: Password@'
                }
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="showHideButton"
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
          {errors.password && <span className="error">{errors.password.message}</span>}
          <FormControlLabel
            control={<Checkbox value="allowExtraEmails" color="primary" />}
            label="I want to receive inspiration, marketing promotions and updates via email."
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="button mt-3"
          >
            Sign Up
          </Button>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={message}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleSnackbarClose}
            ></IconButton>
          }
          className="snackbar"
        />
      </Container>
    </div>
  );
}