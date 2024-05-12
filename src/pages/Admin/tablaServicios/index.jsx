import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuildings, updateBuilding } from '../../../Redux/reducer/reducer.js'; // Importa updateBuilding

const BuildingsComponent = () => {
  const [editableBuildingId, setEditableBuildingId] = useState(null);
  const [editableBuildingValues, setEditableBuildingValues] = useState({});
  const [modifiedFields, setModifiedFields] = useState({});

  const dispatch = useDispatch();
  const buildingsFromRedux = useSelector((state) => state.users.entities);

  useEffect(() => {
    dispatch(fetchBuildings());
  }, [dispatch]);

  const handleEdit = (buildingId) => {
    setEditableBuildingId(buildingId);
    const building = buildingsFromRedux.find(building => building._id === buildingId);
    setEditableBuildingValues(building);
    setModifiedFields({});
  };

  const handleInputChange = (field, value) => {
    setEditableBuildingValues(prevValues => ({
      ...prevValues,
      [field]: value
    }));
    setModifiedFields(prevFields => ({
      ...prevFields,
      [field]: true
    }));
  };

  const handleSave = async () => {
    if (window.confirm('¿Estás seguro de que quieres guardar los cambios?')) {
      try {
        const updatedFields = Object.keys(modifiedFields).filter(key => key !== '_id').filter(key => key in editableBuildingValues).reduce((acc, key) => {
          acc[key] = editableBuildingValues[key];
          return acc;
        }, {});
  
        console.log('Objeto a enviar al backend:', updatedFields); // línea para imprimir el objeto antes de enviarlo al backend
  
        await dispatch(updateBuilding({ id: editableBuildingValues._id, updatedBuilding: updatedFields })); //  esta es línea para usar updateBuilding y pasar el ID por la URL
        setEditableBuildingId(null);
      } catch (error) {
        console.error('Error updating building:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditableBuildingId(null);
  };
  return (
    <div>
      <h2>Tabla de edificios</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell>País</TableCell>
              <TableCell>Propietario</TableCell>
              <TableCell>Número de pisos</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buildingsFromRedux && buildingsFromRedux.map(building => (
              <TableRow key={building._id}>
                <TableCell>
                  {editableBuildingId === building._id ? (
                    <TextField
                      value={editableBuildingValues.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    building.name
                  )}
                </TableCell>
                <TableCell>
                  {editableBuildingId === building._id ? (
                    <TextField
                      value={editableBuildingValues.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    building.address
                  )}
                </TableCell>
                <TableCell>
                  {editableBuildingId === building._id ? (
                    <TextField
                      value={editableBuildingValues.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                    />
                  ) : (
                    building.description
                  )}
                </TableCell>
                <TableCell>
                  {editableBuildingId === building._id ? (
                    <TextField
                      value={editableBuildingValues.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                  ) : (
                    building.city
                  )}
                </TableCell>
                <TableCell>
                  {editableBuildingId === building._id ? (
                    <TextField
                      value={editableBuildingValues.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                  ) : (
                    building.country
                  )}
                </TableCell>
                <TableCell>
                  {editableBuildingId === building._id ? (
                    <TextField
                      value={editableBuildingValues.owner}
                      onChange={(e) => handleInputChange('owner', e.target.value)}
                    />
                  ) : (
                    building.owner
                  )}
                </TableCell>
                <TableCell>
                  {editableBuildingId === building._id ? (
                    <TextField
                      value={editableBuildingValues.numberOfFloors}
                      onChange={(e) => handleInputChange('numberOfFloors', e.target.value)}
                    />
                  ) : (
                    building.numberOfFloors
                  )}
                </TableCell>
                <TableCell>
                  {editableBuildingId === building._id ? (
                    <div>
                      <Button onClick={handleSave}><SaveIcon /> Guardar</Button>
                      <Button onClick={handleCancel}><CancelIcon /> Cancelar</Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleEdit(building._id)}><EditIcon /> Editar</Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BuildingsComponent;