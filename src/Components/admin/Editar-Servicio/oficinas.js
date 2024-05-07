import React, { useState } from 'react';
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
import Link from 'next/link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const TabSecurity = () => {
 const [offices, setOffices] = useState([
    {
      office: 'Oficina 1',
      name: '',
      location: '',
      equipment: [],
      floor: 0,
    },
 ]);

 const [selectedBuilding, setSelectedBuilding] = useState('La celeste II');

 const [selectedEquipment, setSelectedEquipment] = useState([]);

 const [showMessage, setShowMessage] = useState(false);

 const [openDialog, setOpenDialog] = useState({});

 const [openDialoglocation, setOpenDialoglocation] = useState({});

const [tempDescription, setTempDescription] = useState('');

const [templocation, setTemplocation] = useState('');

const [tempDescriptions, setTempDescriptions] = useState({});

const [tempLocations, setTempLocations] = useState({});

const addOffice = () => {
  const newOfficeNumber = offices.length + 1;
  
  const newOffice = {
     office: `Oficina ${newOfficeNumber}`,
     name: '',
     location: '',
     equipment: [], 
     floor: 0,
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

const openDescriptionDialog = (index) => {
  setTempDescriptions({ ...tempDescriptions, [index]: offices[index].Description });
  setOpenDialog({ ...openDialog, [index]: true });
 };
 
 const closeDescriptionDialog = (index) => {
  setOpenDialog({ ...openDialog, [index]: false });
 };
 
 const openLocationDialog = (index) => {
  setTempLocations({ ...tempLocations, [index]: offices[index].location });
  setOpenDialoglocation({ ...openDialoglocation, [index]: true });
 };
 
 const closeLocationDialog = (index) => {
  setOpenDialoglocation({ ...openDialoglocation, [index]: false });
 };


return (
  <form>
    <CardContent sx={{ paddingBottom: 0 }}>
      <Typography style={{ marginTop: '20px', marginBottom: "20px" }} variant="h6" gutterBottom>
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

       
        </Grid>
      </Grid>
    </CardContent>
    <CardContent>

      <Typography style={{ marginTop: "50px" }} variant="h6" gutterBottom>
          Crea nuevas oficinas
        </Typography>
        <Box style={{ marginLeft: '00px', marginBottom: '20px', marginTop: "20px" }}>
          <Box sx={{ mt: 2 }}>
            <Button variant='contained' onClick={addOffice}>
              + Añadir Oficina
            </Button>
            <Button style={{ marginLeft: "20px" }} variant='outlined' onClick={removeOffice}>
              - Quitar Oficina
            </Button>

          </Box>
        </Box>
           
      <Grid item xs={12} sm={6}>

        <Box 
               sx={{
                border: '1px solid',
                borderRadius: '4px',
                padding: '0px',
                position: 'relative',
                overflowX: 'auto',
                maxHeight: '400px',
                scrollbarWidth: 'thin',
                scrollbarColor: '#0091EA black',
                width:"925px",
                marginLeft:"-20px"
              }}>
                  <Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
               <TableRow>
                  <TableCell style={{ fontSize: '22px' }}>Oficinas</TableCell>
                  <TableCell style={{ textAlign: "center", width: "100px", fontSize: "11px" }} >Piso</TableCell>
                  <TableCell align='center'>Descripcion</TableCell>
                  <TableCell align='center'>Equipamiento</TableCell>
                  <TableCell align='center'>Ubicacion en piso</TableCell>
                  <TableCell align='center'>Imagenes de la oficina max 6</TableCell>
                  <TableCell align='center'>Imagen del plano del piso</TableCell>
                 
               </TableRow>
              </TableHead>
              <TableBody>
               {offices.map((office, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}>
                    <TableCell>
                      <TextField
                       
                        fullWidth
                        label="Nombre"
                        value={office.name}
                        onChange={(e) => handleOfficeChange(e, index, 'name')}
                      />
                    </TableCell>
                   
                    <TableCell style={{ minWidth: "100px" }}>
                      <FormControl fullWidth>
                        <Box display="flex" textAlign="center">
                          <TextField
                            type="number"
                            value={office.floor}
                            onChange={(e) => handleOfficeChange(e, index, 'floor')}
                            InputProps={{
                              inputProps: {
                               min: 0,
                              },
                            }}
                            id='form-layouts-separator-select'
                            labelId='form-layouts-separator-select-label'
                          />
                        </Box>
                      </FormControl>
                    </TableCell>

                   
                   
                    <TableCell align="center">
                      <TextField
                          style={{ minWidth: "80px" }}
                          fullWidth
                          value={office.Description}
                          onClick={() => openDescriptionDialog(index)} // Abre el diálogo al hacer clic
                          onChange={(e) => handleOfficeChange(e, index, 'Description')}
                      />
                      <Dialog open={openDialog[index]} onClose={() => closeDescriptionDialog(index)}>
                      <DialogTitle>Escribir Descripción</DialogTitle>
                      <DialogContent>
                          <TextField
                            autoFocus
                            margin="dense"
                            label="Descripción"
                            type="text"
                            fullWidth
                            multiline
                            rows={4}
                            rowsMax={10}
                            value={tempDescriptions[index] || ''}
                            onChange={(e) => setTempDescriptions({ ...tempDescriptions, [index]: e.target.value })}
                            variant="outlined"
                            sx={{ width: '500px' }}
                          />
                      </DialogContent>
                      <DialogActions>
                          <Button onClick={() => closeDescriptionDialog(index)}>Cancelar</Button>
                          <Button onClick={() => {
                            handleOfficeChange({ target: { value: tempDescriptions[index] } }, index, 'Description');
                            closeDescriptionDialog(index);
                          }}>Guardar</Button>
                      </DialogActions>
                      </Dialog>

                      </TableCell>


                    <TableCell style={{ minWidth: "100px", maxWidth:"170px" }}>
                      <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-select-label'>Seleccione</InputLabel>
                          <Select
                              label='Servicios'
                              multiple
                              value={office.equipment} // Utiliza la propiedad 'equipment' del local
                              onChange={(event) => {
                                  const selectedValues = event.target.value;
                                  if (selectedValues.length <= 6) {
                                    const newOffices = [...offices];
                                    newOffices[index].equipment = selectedValues; // Actualiza la propiedad 'equipment' del local
                                    setOffices(newOffices);
                                    setShowMessage(false); // Oculta el mensaje
                                  } else {
                                    setShowMessage(true);
                                  }
                              }}
                              id='form-layouts-separator-select'
                              labelId='form-layouts-separator-select-label'
                              >
                                                       {showMessage && (
                            <Typography variant="body2" color="error">
                                Solo puede elegir 6 amoblamientos.
                            </Typography>
                            )}
                            <MenuItem value='Escritorio'>Escritorio</MenuItem>
                            <MenuItem value='Silla de oficina'>Silla de oficina</MenuItem>
                            <MenuItem value='Sillas'>Sillas</MenuItem>
                            <MenuItem value='Computadora'>Computadora</MenuItem>
                            <MenuItem value='Mesa de conferencia'>Mesa de conferencia</MenuItem>
                            <MenuItem value='Mesas'>Mesas</MenuItem>
                            <MenuItem value='Mesas de trabajo'>Mesas de trabajo</MenuItem>
                            <MenuItem value='Mesas redondas'>Mesas redondas</MenuItem>
                            <MenuItem value='Cocina industrial'>Cocina industrial</MenuItem>
                            <MenuItem value='Materiales de arte'>Materiales de arte</MenuItem>
                            <MenuItem value='Tumbonas'>Tumbonas</MenuItem>
                            <MenuItem value='Sombrillas'>Sombrillas</MenuItem>
                            <MenuItem value='Duchas'>Duchas</MenuItem>
                            {showMessage && (
                            <Typography variant="body2" color="error">
                                Solo puede elegir 6 amoblamientos.
                            </Typography>
                            )}
                            <MenuItem value='Instalaciones deportivas'>Instalaciones deportivas</MenuItem>
                            <MenuItem value='Instalaciones recreativas'>Instalaciones recreativas</MenuItem>
                            <MenuItem value='Salón de Eventos'>Salón de Eventos</MenuItem>
                            <MenuItem value='Estantes'>Estantes</MenuItem>
                            <MenuItem value='Pantalla'>Pantalla</MenuItem>
                            <MenuItem value='Pizarra'>Pizarra</MenuItem>
                            <MenuItem value='Proyector'>Proyector</MenuItem>
                            <MenuItem value='Micrófonos'>Micrófonos</MenuItem>
                            <MenuItem value='Mesa de billar'>Mesa de billar</MenuItem>
                            <MenuItem value='Consolas de videojuegos'>Consolas de videojuegos</MenuItem>
                            {showMessage && (
                            <Typography variant="body2" color="error">
                                Solo puede elegir 6 amoblamientos.
                            </Typography>
                            )}
                            <MenuItem value='Salón de exposiciones'>Salón de exposiciones</MenuItem>
                            <MenuItem value='Stands'>Stands</MenuItem>
                            <MenuItem value='Carretillas'>Carretillas</MenuItem>
                            <MenuItem value='Iluminación ajustable'>Iluminación ajustable</MenuItem>
                            <MenuItem value='Cajas de almacenamiento'>Cajas de almacenamiento</MenuItem>
                            <MenuItem value='Sillas decorativas'>Sillas decorativas</MenuItem>
                            {showMessage && (
                            <Typography variant="body2" color="error">
                                Solo puede elegir 6 amoblamientos.
                            </Typography>
                            )}
                          </Select>
                     
                      </FormControl>
                      </TableCell>

                      <TableCell align="center">
                        <TextField
                            style={{ minWidth: "80px" }}
                            fullWidth
                            value={office.location}
                            onClick={() => openLocationDialog(index)} // Corregido para abrir el diálogo de ubicación
                            onChange={(e) => handleOfficeChange(e, index, 'location')}
                        />
                        <Dialog open={openDialoglocation[index]} onClose={() => closeLocationDialog(index)}>
                            <DialogTitle>Ubicación en el piso</DialogTitle>
                            <DialogContent>
                              <TextField
                                autoFocus
                                margin="dense"
                                label="Ubicación"
                                type="text"
                                fullWidth
                                value={tempLocations[index] || ''}
                                onChange={(e) => setTempLocations({ ...tempLocations, [index]: e.target.value })}
                              />
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => closeLocationDialog(index)}>Cancelar</Button>
                              <Button onClick={() => {
                                handleOfficeChange({ target: { value: tempLocations[index] } }, index, 'location');
                                closeLocationDialog(index);
                              }}>Guardar</Button>
                            </DialogActions>
                        </Dialog>
                        </TableCell>

                  <TableCell style={{ textAlign: "center", minWidth: "50px", maxWidth: "100px" }}>
                      <Button style={{ marginLeft: '0px', width: '3px', height: '10px', borderRadius: '200px', marginBottom: "10px", alignItems: "left" }} component='label' variant='contained' htmlFor='account-settings-upload-image'>
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


                    <TableCell style={{ textAlign: "center", minWidth: "50px", maxWidth: "100px" }}>
                      <Button style={{ marginLeft: '0px', width: '3px', height: '10px', borderRadius: '200px', marginBottom: "10px", alignItems: "left" }} component='label' variant='contained' htmlFor='account-settings-upload-image'>
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