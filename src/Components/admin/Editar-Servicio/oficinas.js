import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  CardContent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import Link from 'next/link';

const TabSecurity = () => {
  const [showHover, setShowHover] = useState(false);
  const [offices, setOffices] = useState([
    {
      office: 'Oficina 1',
      name: '',
      location: '',
      equipment: '',
      floor: 0
    },
  ]);

  const [selectedBuilding, setSelectedBuilding] = useState('La celeste II');
  const [selectedServices, setSelectedServices] = useState([]);
  const [inputValue, setInputValue] = useState(0);



  const addOffice = () => {
    const newOfficeNumber = offices.length + 1;
    const newOffice = {
      office: `Oficina ${newOfficeNumber}`,
      name: '',
      location: '',
      equipment: '',
    };
    setOffices([...offices, newOffice]);
  };

  const removeOffice = () => {
    const updatedOffices = [...offices];
    updatedOffices.pop();
    setOffices(updatedOffices);
  };

  const handleBuildingChange = (event) => {
    setSelectedBuilding(event.target.value);
  };

  const handleOfficeChange = (event, index, field) => {
    const newOffices = [...offices];
    if (field === 'floor') {
       // el valor del piso sea un número y no negativo
       const value = parseInt(event.target.value, 10);
       newOffices[index][field] = isNaN(value) || value < 0 ? 0 : value;
    } else {
       newOffices[index][field] = event.target.value;
    }
    setOffices(newOffices);
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
        <Typography style={{ marginTop: '20px',marginBottom:"20px" }} variant="h6" gutterBottom>
          Seleccione un Servicio
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6}>
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

            <Typography style={{ marginTop: '30px', marginBottom:"20px" }} variant="h6" gutterBottom>
              Seleccione un piso
            </Typography>

            <FormControl fullWidth>
              <InputLabel id='form-layouts-separator-select-label'>Piso</InputLabel>
              <Select
                label='Country'
                defaultValue=''
                id='form-layouts-separator-select'
                labelId='form-layouts-separator-select-label'
              >
                {[...Array(6)].map((_, index) => (
                  <MenuItem key={index} value={index + 1}>
                    {index === 0 ? 'Planta Baja' : `Piso ${index}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Link href="/Admin/tablaOficinas/">
       
       <Button
         style={{
           marginTop: '60px',
         }}
         variant='contained'
         sx={{ marginRight: 0, backgroundColor:"transparent",marginLeft:"50px" }}
       >
       
         Opciones avanzadas
       </Button>
        </Link>
        </Grid>
      </CardContent>

      <CardContent>
        <Typography style={{marginTop:"50px"}} variant="h6" gutterBottom>
          Oficinas del piso
        </Typography>

        <Box style={{ marginLeft: '00px', marginBottom: '20px', marginTop:"20px" }}>
          <Box sx={{ mt: 2 }}>
            <Button variant='contained' onClick={addOffice}>
              + Añadir Oficina
            </Button>
            <Button style={{marginLeft:"20px"}} variant='outlined' onClick={removeOffice}>
              - Quitar Oficina
            </Button>
          </Box>
        </Box>
        <Grid item xs={12} sm={6}>
        <Box
  sx={{
    border: '1px solid',
    borderRadius: '4px',
    padding: '16px',
    position: 'relative',//Estilos de la scroll bar
    overflowX: 'auto', // Establecemos overflowX a 'auto' para permitir el desplazamiento horizontal
    maxHeight: '500px', // Establecemos una altura máxima para evitar que la tabla se vuelva demasiado larga
    scrollbarWidth: 'thin', // Establecemos el ancho de la barra de desplazamiento para que sea delgado
    scrollbarColor: '#0091EA black', // Establecemos el color de la barra de desplazamiento
  }}
>
  <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: '22px' }}>Oficinas</TableCell>
                    

                    <TableCell align="center">Agregar imagenes del local</TableCell>
                    <TableCell align="center">Piso</TableCell>
                    <TableCell style={{aling:"center",width:"100px",fontSize:"11px"}}>Agregar Plano del piso, enmarcando la oficina </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offices.map((office, index) => (
                    <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                      <TableCell align="center">
                        <TextField
                        style={{minWidth:"100px"}}
                          fullWidth
                          label="Nombre"
                          value={office.name}
                          onChange={(e) => handleOfficeChange(e, index, 'name')}
                          />
                      </TableCell>
                          {/* <TableCell align="center">
                           <FormControl style={{ maxWidth: '160px', width: '108px' }}>
                              <InputLabel id='form-layouts-separator-select-label'>Seleccione</InputLabel>
                              <Select
                                label='Servicios'
                                multiple
                                value={selectedServices}
                                onChange={(event) => setSelectedServices(event.target.value)}
                                id='form-layouts-separator-select'
                                labelId='form-layouts-separator-select-label'
                          
                              >
                                <MenuItem value='n°1'>Ansenuza III</MenuItem>
                                <MenuItem value='n°2'>Escritorio</MenuItem>
                                <MenuItem value='n°3'>Silla de oficina</MenuItem>
                                <MenuItem value='n°4'>Sillas</MenuItem>
                                <MenuItem value='n°5'>Computadora</MenuItem>
                                <MenuItem value='n°6'>Mesa de conferencia</MenuItem>
                                <MenuItem value='n°7'>Mesas</MenuItem>
                                <MenuItem value='n°8'>Mesas de trabajo</MenuItem>
                                <MenuItem value='n°9'>Mesas redondas</MenuItem>
                                <MenuItem value='n°10'>Cocina industrial</MenuItem>
                                <MenuItem value='n°11'>Materiales de arte</MenuItem>
                                <MenuItem value='n°12'>Tumbona</MenuItem>
                                <MenuItem value='n°13'>Sombrillas</MenuItem>
                                <MenuItem value='n°14'>Duchas</MenuItem>
                                <MenuItem value='n°15'>Instalaciones deportivas</MenuItem>
                                <MenuItem value='n°16'>Instalaciones recreativas</MenuItem>
                                <MenuItem value='n°17'>Salón de Eventos</MenuItem>
                                <MenuItem value='n°18'>Estantes</MenuItem>
                                <MenuItem value='n°19'>Pantalla</MenuItem>
                                <MenuItem value='n°20'>Pizarra</MenuItem>
                                <MenuItem value='n°21'>Proyector</MenuItem>
                                <MenuItem value='n°22'>Micrófonos</MenuItem>
                                <MenuItem value='n°23'>Mesa de billar</MenuItem>
                                <MenuItem value='n°24'>Consolas de videojuegos</MenuItem>
                                <MenuItem value='n°25'>Salón de exposiciones</MenuItem>
                                <MenuItem value='n°26'>Stands</MenuItem>
                                <MenuItem value='n°27'>Iluminación ajustable</MenuItem>
                                <MenuItem value='n°28'>Cajas de almacenamiento</MenuItem>
                                <MenuItem value='n°29'>Sillas decorativas</MenuItem>
                                {/* Agrega el resto de tus opciones aquí con valores únicos */}
                              {/* </Select>
                           </FormControl>
                          </TableCell> */} 

<TableCell style={{alignItems:"center", width:"50px"}}>
                      <Button style={{marginLeft: '0px', width: '3px', height: '10px', borderRadius: '200px',marginBottom:"10px",alignItems:"left"}} component='label' variant='contained' htmlFor='account-settings-upload-image'>
                 +
                  <input
                    hidden
                    type='file'
                    onChange={addImageToFloor}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </Button>
                        <Button
                          style={{ marginLeft: '0px', width: '30px', height: '10px', borderRadius: '200px' }}
                          variant='contained'
                          onClick={() => addImageToFloor(office.office)}
                        >
                          Ver
                        </Button>
                      </TableCell>

            <TableCell style={{minWidth:"100px"}}>
            <FormControl fullWidth>
              
                <Box display="flex" alignItems="center">
                <TextField
            type="number"
            value={office.floor} // Usa el valor del piso de la oficina
            onChange={(e) => handleOfficeChange(e, index, 'floor')} // Indica que el campo que se está actualizando es 'floor'
            InputProps={{
                inputProps: {
                  min: 0, // Esto asegura que el input no permita números negativos
                },
            }}
            id='form-layouts-separator-select'
            labelId='form-layouts-separator-select-label'
            />

                </Box>
            </FormControl>
            </TableCell>
             
                      <TableCell style={{alignItems:"center", minWidth:"50ox",maxWidth:"40px"}}>
                      <Button style={{marginLeft: '0px', width: '3px', height: '10px', borderRadius: '200px',marginBottom:"10px",alignItems:"left"}} component='label' variant='contained' htmlFor='account-settings-upload-image'>
                 +
                  <input
                    hidden
                    type='file'
                    onChange={addImageToFloor}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </Button>
                        <Button
                          style={{ marginLeft: '0px', width: '30px', height: '10px', borderRadius: '200px' }}
                          variant='contained'
                          onClick={() => addImageToFloor(office.office)}
                        >
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

      <Grid style={{ marginLeft: '15px', marginBottom: '20px' }} item xs={12} sm={6}>


        <Button
          style={{
            marginTop: '60px',
          }}
          variant='contained'
          sx={{ marginRight: 3.5 }}
        >
          Guardar cambios
        </Button>
      </Grid>
    </form>
  );
};

export default TabSecurity;