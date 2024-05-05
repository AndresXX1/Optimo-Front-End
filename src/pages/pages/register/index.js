// ** React Imports

import { useState, Fragment } from 'react'
import Image from 'next/image';
import snfondo from '../../../../public/logos/snfondo.png'

// ** Next Imports

import Link from 'next/link'

// ** MUI Components

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled, useTheme } from '@mui/material/styles'
import MuiCard from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel from '@mui/material/FormControlLabel'

// ** Icons Imports

import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Configs

import themeConfig from 'src/configs/themeConfig'

// ** Layout Import

import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports


// ** Styled Components

const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}))

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const FormControlLabel = styled(MuiFormControlLabel)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(4),
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const RegisterPage = () => {

  // ** States

  const [values, setValues] = useState({
    password: '',
    showPassword: false
  })

  // ** Hook

  const theme = useTheme()

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", }}>
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
               <TextField autoFocus fullWidth id='username' label='Nombre de usuario' sx={{ marginBottom: 4 }} />
               <TextField fullWidth type='email' label='Email' sx={{ marginBottom: 4 }} />
               <FormControl fullWidth>
                 <InputLabel htmlFor='auth-register-password'>Contraseña</InputLabel>
                 <OutlinedInput
                   label='Password'
                   value={values.password}
                   id='auth-register-password'
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
                         {values.showPassword ? <EyeOutline fontSize='small' /> : <EyeOffOutline fontSize='small' />}
                       </IconButton>
                    </InputAdornment>
                   }
                 />
               </FormControl>
               <FormControlLabel
                 control={<Checkbox />}
                 label={
                   <Fragment>
                    <span>Yo acepto </span>
                    <Link href='/' passHref>
                       <LinkStyled onClick={e => e.preventDefault()}>Los terminos de politica y privacidad</LinkStyled>
                    </Link>
                   </Fragment>
                 }
               />
               <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
                 Registrate
               </Button>



               {/* <Link href="/Cliente">
                 <Button fullWidth size='large' type='submit' variant='contained' sx={{ marginBottom: 7 }}>
                   Volver al Inicio
                 </Button>
               </Link> */}



               <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                 <Typography variant='body2' sx={{ marginRight: 2 }}>
                   Ya tienes una cuenta?
                 </Typography>
                 <Typography variant='body2'>
                   <Link passHref href='/pages/login'>
                    <LinkStyled style={{fontSize:"20px"}}>Inicia session</LinkStyled>
                   </Link>
                 </Typography>
               </Box>



               {/* <Divider sx={{ my: 5 }}>or</Divider>
               <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Link href='/' passHref>
                   <IconButton component='a' onClick={e => e.preventDefault()}>
                    <Facebook sx={{ color: '#497ce2' }} />
                   </IconButton>
                 </Link>
                 <Link href='/' passHref>
                   <IconButton component='a' onClick={e => e.preventDefault()}>
                    <Twitter sx={{ color: '#1da1f2' }} />
                   </IconButton>
                 </Link>
                 <Link href='/' passHref>
                   <IconButton component='a' onClick={e => e.preventDefault()}>
                    <Github
                       sx={{ color: theme => (theme.palette.mode === 'light' ? '#272727' : theme.palette.grey[300]) }}
                    />
                   </IconButton>
                 </Link>
                 <Link href='/' passHref>
                   <IconButton component='a' onClick={e => e.preventDefault()}>
                    <Google sx={{ color: '#db4437' }} />
                   </IconButton>
                 </Link>
               </Box> */}



             </form>
           </CardContent>
         </Card>
    
       </Box>
       </div>
    )
   }
RegisterPage.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default RegisterPage
