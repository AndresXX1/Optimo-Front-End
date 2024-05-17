import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Select, MenuItem, Button } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, updateUser } from '../../../Redux/reducer/reducer.js';

const UsersComponent = () => {
  const [editableUserId, setEditableUserId] = useState(null);

  const [editableUserValues, setEditableUserValues] = useState({

    _id: '', 
    status: '',
    resetPasswordToken: null,
    name: '',
    email: '',
    role: '',
    phone: '',
    bookings: [],
    __v: 0
  });
  
  const [modifiedFields, setModifiedFields] = useState({}); 
  const dispatch = useDispatch();
  const usersFromRedux = useSelector((state) => state.users.entities);
  const roles = ["admin", "user", ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (userId) => {
    setEditableUserId(userId);
    const user = usersFromRedux.find(user => user._id === userId);
    setEditableUserValues(user);
    setModifiedFields({}); 
  };

  const handleInputChange = (field, value) => {
    setEditableUserValues(prevValues => ({
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
     
      const updatedFields = Object.keys(modifiedFields).filter(key => key in editableUserValues).reduce((acc, key) => {
        acc[key] = editableUserValues[key];

        return acc;

      }, {});

  
      const updatedUser = {
        id: editableUserValues._id, 
        ...updatedFields
      };

      console.log('Objeto a enviar:', updatedUser);

      await dispatch(updateUser(updatedUser));
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