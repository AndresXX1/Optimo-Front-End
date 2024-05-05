// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'


// ** Icons Imports
import Close from 'mdi-material-ui/Close'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 200,
  height: 200,
  marginRight: theme.spacing(6.25),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4.5),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/logos/iconocam.png')

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.targetW
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  return (
    <CardContent>
      <form>
        
      <Typography style={{ marginTop: '10px',marginBottom:"20px" }} variant="h6" gutterBottom>
          Seleccione un Servicio
        </Typography>
              <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='form-layouts-separator-select-label'>Seleccione</InputLabel>
                    <Select
                      label='Servicios'
                      defaultValue=''
                      id='form-layouts-separator-select'
                      labelId='form-layouts-separator-select-label'
                    >
                      <MenuItem value='n°1'>Ansenuza III</MenuItem>
                      <MenuItem value='n°2'>La celeste II</MenuItem>
    
                    </Select>
                  </FormControl>
              </Grid>
        <Grid container spacing={7}>
          <Grid item xs={12} sx={{ marginTop: 4.8, marginBottom: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' ,marginLeft:"200px"}}>
              <ImgStyled  src={imgSrc} alt='Profile Pic' />
              <Box style={{
                marginLeft:"30px",
              
              }}>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Cambia la imagen del servicio
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
  
                <Typography variant='body2' sx={{ marginTop: 5 }}>
                  Modifica las imagenes! :D Cargalas en formato jpg y png.
                </Typography>
              </Box>
            </Box>
          <Typography style={{ marginTop: '70px',marginBottom:"-20px" }} variant="h6" gutterBottom>
          Modifica los datos del servicio
        </Typography>
          </Grid>


          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Nombre' placeholder='Ej: complejo Esperanza'  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Direccion' placeholder='Ej:Siempreviva 127' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Pisos Totales' placeholder='Ej:7' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Oficinas Totales' placeholder='Ej:50' />
          </Grid>


          <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='form-layouts-separator-select-label'>Pais</InputLabel>
                <Select
                  label='Country'
                  defaultValue=''
                  id='form-layouts-separator-select'
                  labelId='form-layouts-separator-select-label'
                >
                  <MenuItem value='Arg'>Argentina</MenuItem>
                  <MenuItem value='Col'>Colombia</MenuItem>
                  <MenuItem value='Ecu'>Ecuador</MenuItem>
                  <MenuItem value='Chile'>Chile</MenuItem>
                  <MenuItem value='Ven'>Venezuela</MenuItem>
                  <MenuItem value='Uru'>Uruguay</MenuItem>
                  <MenuItem value='Bol'>Bolivia</MenuItem>
                  <MenuItem value='Peru'>Peru</MenuItem>
                </Select>
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField fullWidth label='Ciudad' placeholder='Ej: La pampa' />
          </Grid>
            </Grid>
 
            <Grid container spacing={6}>
            <Grid  item xs={12} sx={{ marginTop: 4.8 }}>
              <TextField
                fullWidth
                multiline
                label='Bio'
                minRows={2}
                placeholder='Bio'
               
              />
            </Grid>
            </Grid>


          <Grid item xs={12} sm = {6}>
            <Button style={{
              marginTop: "60px"
            }} variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>

          </Grid>
      
      </form>
    </CardContent>
  )
}

export default TabAccount
