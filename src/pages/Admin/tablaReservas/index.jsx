import React, { useEffect, useState } from 'react';
 import styles from './reservas.module.css'; // Importa los estilos como un módulo de CSS
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
      <h2 className={styles.title}>Tabla de usuarios</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>ROL</th>
              <th>Email</th>
              <th>Fecha de creación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map(user => (
              <tr key={user.id} className={styles.row}>
                <td className={styles.cell}>{user.id}</td>
                <td className={styles.cell}>
                  {editableUser === user.id ? (
                    <select
                      className={styles.input}
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
                <td className={styles.cell}>
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
                {/* Agrega celdas similares para los otros campos */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
            };

            export default UsersComponent;