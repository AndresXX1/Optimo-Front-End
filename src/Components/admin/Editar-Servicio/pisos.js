// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'; // Añade esta línea
import MenuItem from '@mui/material/MenuItem';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from "@mui/material/TableBody";

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import KeyOutline from 'mdi-material-ui/KeyOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockOpenOutline from 'mdi-material-ui/LockOpenOutline'

const TabSecurity = () => {
  // ** States


  const [floors, setFloors] = useState({
    'Ansenuza III': ['Planta Baja'],
    'La celeste II': ['Planta Baja']
 });
 const [floorImages, setFloorImages] = useState({});
  const [selectedBuilding, setSelectedBuilding] = useState('La celeste II');

  const addFloor = () => {
    setFloors(prevFloors => ({
      ...prevFloors,
      [selectedBuilding]: [...prevFloors[selectedBuilding], `Piso ${prevFloors[selectedBuilding].length}`]
    }));
 };

 const removeFloor = () => {
    setFloors(prevFloors => ({
      ...prevFloors,
      [selectedBuilding]: prevFloors[selectedBuilding].slice(0, -1)
    }));
 };

 const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
 };



 const addImageToFloor = file => {
  const reader = new FileReader()
  const { files } = file.target
  if (files && files.length !== 0) {
    reader.onload = () => setImgSrc(reader.result)
    reader.readAsDataURL(files[0])
  }
}



  return (
    <form>
    <CardContent sx={{ paddingBottom: 0 }}>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={6}>
        <Typography style={{ marginTop: '20px',marginBottom:"20px" }} variant="h6" gutterBottom>
          Seleccione un Servicio
        </Typography>
          <FormControl fullWidth>
            <InputLabel id='form-layouts-separator-select-label'>Seleccione</InputLabel>
            <Select
              label='Servicios'
              value={selectedBuilding}
              onChange={handleBuildingChange}
              id='form-layouts-separator-select'
              labelId='form-layouts-separator-select-label'
            >
              <MenuItem value='Ansenuza III'>Ansenuza III</MenuItem>
              <MenuItem value='La celeste II'>La celeste II</MenuItem>
            </Select>
          </FormControl>
        </Grid>
         
        </Grid>
      </CardContent>
  
      <CardContent>
        <Typography style={{
          marginTop:"50px"
        }} variant="h6" gutterBottom>
          Pisos del Servicio
        </Typography>

        <Box style={{marginTop:"20px", marginBottom:"20px"}}>
        <Box sx={{ mt: 2 }}>
          <Button variant='contained' onClick={addFloor}>
            + Añadir Piso
          </Button>
          <Button variant='outlined' onClick={removeFloor}>
            - Quitar Piso
          </Button>
        </Box>
        </Box>
        <Grid item xs={12} sm={6}>
           <Box
                sx={{
                  border: '1px solid',
                  borderRadius: '4px',
                  padding: '16px',
                  position: 'relative',
                  overflowX: 'auto', 
                  maxHeight: '500px', // Establecemos una altura máxima para evitar que la tabla se vuelva demasiado larga
                  '&::-webkit-scrollbar': {
                    width: '6px', // Ancho de la barra de desplazamiento
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'black', // Color de fondo de la barra de desplazamiento
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: '#0091EA', // Color de la barra de desplazamiento
                    borderRadius: '3px', 
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: '#0091EA', // Color del pulgar de la barra de desplazamiento al pasar el mouse sobre él
                  },
                }}
              >
          <TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                 <TableCell style={{fontSize: "22px"}}>Pisos</TableCell>
                 <TableCell align="right">
                 <Typography  variant="h6" gutterBottom>
          Plano de planta del piso
        </Typography>Agregar imagen  </TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {floors[selectedBuilding].map((floor, index) => (
                 <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {floor}
                    </TableCell>
                    <TableCell align="right">
                    <Button component='label' variant='contained' htmlFor='account-settings-upload-image'>
                 +
                  <input
                    hidden
                    type='file'
                    onChange={addImageToFloor}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </Button>
                      <Button style={{marginLeft:"10px"}}variant='contained' onClick={() => addImageToFloor(floor)}>
                        Ver
                      </Button>
                    </TableCell>
                 </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        </Grid>
      </CardContent>

      <Grid style={{marginLeft:"15px",marginBottom:"20px"}} item xs={12} sm = {6}>
            <Button style={{
              marginTop: "60px"
            }} variant='contained' sx={{ marginRight: 3.5 }}>
              Save Changes
            </Button>

          </Grid>
    </form>
  )
}

export default TabSecurity
