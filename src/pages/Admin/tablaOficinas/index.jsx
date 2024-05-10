import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsByBuilding } from '../../../Redux/reducer/rooms'; 
import BuildingSelect from './BuildingSelect'; 

const RoomsComponent = () => {
  const [editableRoomId, setEditableRoomId] = useState(null);
  const [editableRoomValues, setEditableRoomValues] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});
  const dispatch = useDispatch();
  const roomsFromRedux = useSelector((state) => state.rooms.rooms);
  console.log("Rooms from Redux:", roomsFromRedux);
  const selectedBuildingId = useSelector((state) => state.selectedBuildingId);

  useEffect(() => {
    console.log("Selected Building ID:", selectedBuildingId); // Agregar este console.log
    if (selectedBuildingId) {
      dispatch(fetchRoomsByBuilding(selectedBuildingId));
    }
  }, [selectedBuildingId, dispatch]);

  useEffect(() => {
    console.log("Rooms from Redux:", roomsFromRedux);
  }, [roomsFromRedux]);

  const handleEdit = (roomId) => {
    setEditableRoomId(roomId);
    const room = roomsFromRedux.find(room => room._id === roomId); // Comparación corregida
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
      [field]: true
    }));
  };

  const handleSave = async () => {
    // Lógica para guardar los cambios en la habitación
  };

  const handleCancel = () => {
    setEditableRoomId(null);
  };

  return (
    <div>
      <h2>Tabla de habitaciones</h2>
      <BuildingSelect onSelectBuilding={(buildingId) => {
        console.log("ACAAAAAAAAA:", roomsFromRedux); // Agregar este console.log
        dispatch(fetchRoomsByBuilding(buildingId));
      }} /> 
      {/* Pasa una función de devolución de llamada para manejar la selección del edificio */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Ubicación</TableCell>
              <TableCell>Equipamiento</TableCell>
              <TableCell>Tipo</TableCell>
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
                  {editableRoomId === room.id ? (
                    <TextField
                      value={editableRoomValues.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                  ) : (
                    room.location
                  )}
                </TableCell>
                <TableCell>
                  {editableRoomId === room._id ? (
                    <TextField
                      value={editableRoomValues.equipment}
                      onChange={(e) => handleInputChange('equipment', e.target.value)}
                    />
                  ) : (
                    room.equipment
                  )}
                </TableCell>
                <TableCell>
                  {editableRoomId === room._id ? (
                    <TextField
                      value={editableRoomValues.type}
                      onChange={(e) => handleInputChange('type', e.target.value)}
                    />
                  ) : (
                    room.type
                  )}
                </TableCell>
                <TableCell>
                  {editableRoomId === room.id ? (
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
                  {editableRoomId === room._id ? (
                    <TextField
                      value={editableRoomValues.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  ) : (
                    room.description
                  )}
                </TableCell>
                <TableCell>
                  {editableRoomId === room._id ? (
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