import React, { useEffect, useState } from 'react';
 import styles from './oficinas.module.css'; // Importa los estilos como un módulo de CSS
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';

const UsersComponent = ({ users }) => {
  const [editableUser, setEditableUser] = useState(null);
  const [editableUserValues, setEditableUserValues] = useState({});
  const roles = ["admin", "buyer"];

  const handleBanUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres bannear este usuario?')) {
       // Lógica para banear al usuario
    }
  };
   
  const handleUnbanUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres des-bannear este Usuario?')) {
       // Lógica para des-bannear al usuario
    }
  };
   
  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este Usuario? Esta acción es irreversible y se borrará de la base de datos')) {
       // Lógica para eliminar al usuario
    }
  };
   
  const handleSave = async (userId) => {
    if (window.confirm('¿Estás seguro de que quieres guardar los cambios?')) {
       // Lógica para guardar los cambios del usuario
    }
  };

  const handleEdit = (userId) => {
    setEditableUser(userId);
    setEditableUserValues((prevValues) => ({
      ...prevValues,
      [userId]: { ...users.find((user) => user.id === userId) },
    }));
  };

  const handleInputChange = (userId, field, value) => {
    setEditableUserValues((prevValues) => ({
      ...prevValues,
      [userId]: {
        ...prevValues[userId],
        [field]: value,
      },
    }));
  };

  const handleCancel = () => {
    setEditableUser(null);
    setEditableUserValues({});
  };

  return (
    <div className={styles.userContainer}>
      <h2 className={styles.title}>Tabla de Oficinas</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
            <th>Nombre</th>
            <th>Piso</th>
              <th>Ubicacion</th>
              <th>Reservaciones</th>
              <th>Tipo</th>
              <th>Equipamiento</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user => (
              <tr key={user.id} className={styles.row}>
                <td>{user.id}</td>
                <td>
                  {editableUser === user.id ? (
                    <select
                      value={editableUserValues[user.id]?.rol || user.rol}
                      onChange={(e) => handleInputChange(user.id, 'rol', e.target.value)}
                    >
                      {roles.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    user.rol
                  )}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <input
                      type="text"
                      value={editableUserValues[user.id]?.name || ''}
                      onChange={(e) => handleInputChange(user.id, 'name', e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <input
                      type="text"
                      value={editableUserValues[user.id]?.surName || ''}
                      onChange={(e) => handleInputChange(user.id, 'surName', e.target.value)}
                    />
                  ) : (
                    user.surName
                  )}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <input
                      type="text"
                      value={editableUserValues[user.id]?.email || ''}
                      onChange={(e) => handleInputChange(user.id, 'email', e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <input
                      type="text"
                      value={editableUserValues[user.id]?.password || ''}
                      onChange={(e) => handleInputChange(user.id, 'password', e.target.value)}
                    />
                  ) : (
                    user.password
                  )}
                </td>
                <td>
                  {user.banned ? "True" : "False"}
                </td>
                <td>
                  {editableUser === user.id ? (
                    <div>
                      <button className={styles.button} onClick={() => handleCancel()}><CancelIcon/></button>
                      <button className={styles.button} onClick={() => handleSave(user.id)}><SaveIcon/></button>
                    </div>
                  ) : (
                    <div>
                      <button className={styles.button} onClick={() => handleEdit(user.id)}><EditIcon/></button>
                      <button className={styles.button} onClick={() => handleDelete(user.id)}><DeleteIcon/></button>
                      {user.banned ? (
                        <button className={styles.button} onClick={() => handleUnbanUser(user.id)}><CheckCircleIcon /> des-bannear</button>
                      ) : (
                        <button className={styles.button} onClick={() => handleBanUser(user.id)}><BlockIcon /> bannear</button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
            };

            export default UsersComponent;