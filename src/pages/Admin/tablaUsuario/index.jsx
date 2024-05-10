import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser } from '../../../Redux/reducer/reducer.js'; // Asegúrate de importar updateUser aquí

const UsersComponent = () => {
  const [editableUserId, setEditableUserId] = useState(null);
  const [editableUserValues, setEditableUserValues] = useState({
    _id: '', // Asegúrate de incluir el ID del usuario
    status: '',
    resetPasswordToken: null,
    name: '',
    email: '',
    role: '',
    phone: '',
    bookings: [],
    __v: 0
  });
  const [modifiedFields, setModifiedFields] = useState({}); // Para rastrear los campos modificados
  const dispatch = useDispatch();
  const usersFromRedux = useSelector((state) => state.users.entities);
  const roles = ["admin", "user", "superAdmin"];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (userId) => {
    setEditableUserId(userId);
    const user = usersFromRedux.find(user => user._id === userId);
    setEditableUserValues(user);
    setModifiedFields({}); // Reinicia los campos modificados cuando se edita un nuevo usuario
  };

  const handleInputChange = (field, value) => {
    setEditableUserValues(prevValues => ({
    ...prevValues,
      [field]: value
    }));
    setModifiedFields(prevFields => ({
    ...prevFields,
      [field]: true // Marca el campo como modificado
    }));
  };

  const handleSave = async () => {
    if (window.confirm('¿Estás seguro de que quieres guardar los cambios?')) {
      try {
        // Crea un nuevo objeto con solo el ID y los campos modificados
        // Asegúrate de cambiar _id a id para coincidir con el backend
        const updatedUser = {
          id: editableUserValues._id, // Cambia _id a id
         ...Object.keys(modifiedFields).reduce((acc, key) => {
            acc[key] = editableUserValues[key];
            return acc;
          }, {})
        };
        console.log('Objeto a enviar:', updatedUser);
        
        await dispatch(updateUser(updatedUser)); // Despacha updateUser con el objeto actualizado
        setEditableUserId(null);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleCancel = () => {
    setEditableUserId(null);
  };

  return (
    <div>
      <h2>Tabla de usuarios</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>ROL</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersFromRedux && usersFromRedux.map(user => (
              <TableRow key={user._id}>
                <TableCell>
                  {editableUserId === user._id? (
                    <TextField
                      value={editableUserValues.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </TableCell>
                <TableCell>
                  {editableUserId === user._id? (
                    <TextField
                      value={editableUserValues.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    user.phone
                  )}
                </TableCell>
                <TableCell>
                  {editableUserId === user._id? (
                    <Select
                      value={editableUserValues.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                    >
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    user.role
                  )}
                </TableCell>
                <TableCell>
                  {editableUserId === user._id? (
                    <TextField
                      value={editableUserValues.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </TableCell>
                <TableCell>
                  {editableUserId === user._id? (
                    <Select
                      value={editableUserValues.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                    >
                      <MenuItem value="active">Activo</MenuItem>
                      <MenuItem value="inactive">Inactivo</MenuItem>
                      <MenuItem value="banned">Baneado</MenuItem>
                      <MenuItem value="invisible">Invisible</MenuItem>
                    </Select>
                  ) : (
                    user.status
                  )}
                </TableCell>
                <TableCell>
                  {editableUserId === user._id? (
                    <div>
                      <Button onClick={handleSave}><SaveIcon /> Guardar</Button>
                      <Button onClick={handleCancel}><CancelIcon /> Cancelar</Button>
                    </div>
                  ) : (
                    <Button onClick={() => handleEdit(user._id)}><EditIcon /> Editar</Button>
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

export default UsersComponent;