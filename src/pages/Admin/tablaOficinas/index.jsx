import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsByBuilding, updateRoom } from '../../../Redux/reducer/rooms';
import BuildingSelect from './BuildingSelect';
import { setSelectedBuildingId } from '../../../Redux/reducer/rooms'; 
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import {FormControl, InputLabel, Select, MenuItem} from '@mui/material';

const RoomsComponent = () => {
    const [editableRoomId, setEditableRoomId] = useState(null);
    const [editableRoomValues, setEditableRoomValues] = useState({});
    const [modifiedFields, setModifiedFields] = useState({});
    const dispatch = useDispatch();
    const roomsFromRedux = useSelector((state) => state.rooms.rooms);
    console.log("Rooms from Redux:", roomsFromRedux);
    const selectedBuildingId = useSelector((state) => state.rooms.selectedBuildingId);
    const [openDescriptionDialog, setOpenDescriptionDialog] = useState({});
    const [openLocationDialog, setOpenLocationDialog] = useState({});
    const [showMessage, setShowMessage] = useState(false);


    useEffect(() => {
        console.log("Selected Building ID:", selectedBuildingId);
        if (selectedBuildingId) {
            dispatch(fetchRoomsByBuilding(selectedBuildingId));
        }
    }, [selectedBuildingId, dispatch]);

    useEffect(() => {
        console.log("Rooms from Redux:", roomsFromRedux);
    }, [roomsFromRedux]);

    
  const handleEdit = (roomId) => {
    setEditableRoomId(roomId);
    const room = roomsFromRedux.find(room => room._id === roomId); 
    console.log("Editing Room:", room);
    setEditableRoomValues(room);
    setModifiedFields({});
  };
  

  const handleInputChange = (field, value) => {
    setEditableRoomValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
    setModifiedFields(prevFields => ({
      ...prevFields,
      [field]: value 
    }));
  };

  const handleSave = async () => {
    try {
      if (!selectedBuildingId) {
        console.error('Error: selectedBuildingId is undefined');
        return;
      }
  
      await dispatch(
        updateRoom({
          buildingId: selectedBuildingId,
          roomId: editableRoomId,
          updateRoomData: modifiedFields,
        })
      );
      setEditableRoomId(null);
      setModifiedFields({}); // Limpiar campos modificados después de guardar
    } catch (error) {
      console.error('Error updating room:', error);
    }
  };
  

  const handleCancel = () => {
    setEditableRoomId(null);
  };

  const openDescriptionDialogFunc = (roomId) => {
    setOpenDescriptionDialog(prev => ({...prev, [roomId]: true }));
  };
  
  const closeDescriptionDialog = (roomId) => {
    setOpenDescriptionDialog(prev => ({...prev, [roomId]: false }));
  };
   
   const openLocationDialogFunc = (roomId) => {
    setOpenLocationDialog(prev => ({...prev, [roomId]: true }));
   };
   
   const closeLocationDialog = (roomId) => {
    setOpenLocationDialog(prev => ({...prev, [roomId]: false }));
   };


  return (
    <div>
      
      <div style={{marginBottom:"30px",marginTop:"30px"}}>

      <BuildingSelect  
  onSelectBuilding={(buildingId) => {
    dispatch(setSelectedBuildingId(buildingId)); 
    dispatch(fetchRoomsByBuilding(buildingId));
    console.log("ACAAAAAAAAA:", roomsFromRedux); 
  }} 
/> 
      </div>
     
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Equipamiento</TableCell>
           
              <TableCell>Número de piso</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Imágenes</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Array.isArray(roomsFromRedux) && roomsFromRedux.map(room => (
              <TableRow key={room._id}>
                <TableCell>
                  {editableRoomId === room._id ? (
                    <TextField
                      value={editableRoomValues.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    room.name
                  )}
                </TableCell>
<TableCell>
  {editableRoomId === room._id? (
    <TextField
      value={editableRoomValues.location}
      onChange={(e) => handleInputChange('location', e.target.value)}
      onClick={() => {
        // Verifica si el diálogo ya está abierto y lo cierra si es así
        if (openLocationDialog[room._id]) {
          closeLocationDialog(room._id);
        }
        // Abre el diálogo
        openLocationDialogFunc(room._id);
      }}
    />
  ) : (
    room.location
  )}
  <Dialog open={openLocationDialog[room._id]} onClose={() => closeLocationDialog(room._id)}>
    <DialogTitle>Escribir ubicacion</DialogTitle>
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
        value={editableRoomValues.location || ''}     
        onChange={(e) => {
          setEditableRoomValues(prevValues => ({
           ...prevValues,
            location: e.target.value, 
          }));
        }}
        variant="outlined"
        sx={{ width: '500px' }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => closeLocationDialog(room._id)}>Cancelar</Button>
      <Button onClick={() => closeLocationDialog(room._id)}>Guardar</Button>
    </DialogActions>
  </Dialog>
</TableCell>

<TableCell style={{ minWidth: "100px", maxWidth:"170px" }}>
                      <FormControl fullWidth>
                          <InputLabel id='form-layouts-separator-select-label'>Seleccione</InputLabel>
                          <Select
                              label='Servicios'
                              multiple
                              value={editableRoomValues.equipment} // Utiliza la propiedad 'equipment' del local
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

                <TableCell>
                  {editableRoomId === room._id ? (
                    <TextField
                      type="number"
                      value={editableRoomValues.floorNumber}
                      onChange={(e) => handleInputChange('floorNumber', parseInt(e.target.value))}
                    />
                  ) : (
                    room.floorNumber
                  )}
                </TableCell>
                <TableCell>
  {editableRoomId === room._id? (
    <TextField
      value={editableRoomValues.description}
      onChange={(e) => handleInputChange('description', e.target.value)}
      onClick={() => {
        // Verifica si el diálogo ya está abierto y lo cierra si es así
        if (openDescriptionDialog[room._id]) {
          closeDescriptionDialog(room._id);
        }
        // Abre el diálogo
        openDescriptionDialogFunc(room._id);
      }}
    />
  ) : (
    room.description
  )}
  <Dialog open={openDescriptionDialog[room._id]} onClose={() => closeDescriptionDialog(room._id)}>
    <DialogTitle>Escribir descripción</DialogTitle>
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
        value={editableRoomValues.description || ''}     
        onChange={(e) => {
          setEditableRoomValues(prevValues => ({
         ...prevValues,
            description: e.target.value, 
          }));
        }}
        variant="outlined"
        sx={{ width: '500px' }}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={() => closeDescriptionDialog(room._id)}>Cancelar</Button>
      <Button onClick={() => closeDescriptionDialog(room._id)}>Guardar</Button>
    </DialogActions>
  </Dialog>
</TableCell>
                <TableCell>
                  {editableRoomId === room.id ? (
                    <TextField
                      value={editableRoomValues.images}
                      onChange={(e) => handleInputChange('images', e.target.value)}
                    />
                  ) : (
                    room.images
                  )}
                </TableCell>
                <TableCell>
                  {editableRoomId === room._id ? (
                    <div>
                      <Button onClick={handleSave}><SaveIcon /> Guardar</Button>
                      <Button onClick={handleCancel}><CancelIcon /> Cancelar</Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleEdit(room._id)}><EditIcon /> Editar</Button>
                  )}
                </TableCell>
              </TableRow>
            )) || []}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RoomsComponent;