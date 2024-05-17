import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, Button, Box, IconButton, MenuItem, Table, TableBody, TableCell, TableRow, Grid, CircularProgress, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createBooking } from '../../../Redux/reducer/bookings';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReservationForm = () => {
  const containerStyle = {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const [reservations, setReservations] = useState([
    { startDate: new Date(), endDate: new Date(), startTime: null, endTime: null, eventName: '', comment: '' },
  ]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [RoomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const { id } = router.query; // Obtener el ID del room desde la URL
  const token = useSelector((state) => state.token);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    setIsEnabled(true);

    const hotel = id; 
    if (hotel) {
      setRoomName(hotel.Nombre);
    }
  }, [id]);

  const handleDateChange = (index, date) => {
    const newReservations = [...reservations];
    newReservations[index].startDate = date;
    newReservations[index].endDate = date;
    setReservations(newReservations);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleEventNameChange = (index, name) => {
    const newReservations = [...reservations];
    newReservations[index].eventName = name;
    setReservations(newReservations);
  };

  const handleCommentChange = (index, comment) => {
    const newReservations = [...reservations];
    newReservations[index].comment = comment;
    setReservations(newReservations);
  };

  const handleTimeChange = (index, time, isStartTime) => {
    const newReservations = [...reservations];
    if (isStartTime) {
      newReservations[index].startTime = time;
    } else {
      if (newReservations[index].startTime && time <= newReservations[index].startTime) {
        alert("La hora de fin no puede ser anterior o igual a la hora de inicio.");
        return;
      }
      newReservations[index].endTime = time;
    }
    setReservations(newReservations);
  };

  const addReservation = () => {
    const lastReservation = reservations[reservations.length - 1];
    const newStartDate = new Date(lastReservation.endDate);
    newStartDate.setDate(newStartDate.getDate() + 1);

    setReservations([
      ...reservations,
      { startDate: newStartDate, endDate: newStartDate, startTime: null, endTime: null, eventName: '', comment: '' },
    ]);
  };

  const removeReservation = (index) => {
    if (index === 0) {
      return;
    }
    const newReservations = [...reservations];
    newReservations.splice(index, 1);
    setReservations(newReservations);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Obtener el decodedToken desde localStorage
    const decodedToken = JSON.parse(localStorage.getItem('decodedToken'));
    const userId = decodedToken ? decodedToken.userId : null;
  
    setLoading(true);
    for (let i = 0; i < reservations.length; i++) {
      const reservation = reservations[i];
  
      // Crear objetos de fecha válidos para startTime y endingTime
      const startDateTime = new Date(reservation.startDate);
      startDateTime.setHours(reservation.startTime);
      startDateTime.setMinutes(0);
      startDateTime.setSeconds(0);
  
      const endDateTime = new Date(reservation.startDate);
      endDateTime.setHours(reservation.endTime);
      endDateTime.setMinutes(0);
      endDateTime.setSeconds(0);
  
      const formattedReservation = {
        startTime: startDateTime,
        endingTime: endDateTime,
        comment: reservation.comment,
        tittle: reservation.eventName,
        user: userId, // Usar el ID del usuario obtenido del decodedToken
        room: id, // Usar el ID del room obtenido de la URL
      };
  
      setLoadingMessage(`Loading ${i + 1}/${reservations.length}`);
      console.log("Datos enviados:", formattedReservation);
      try {
        const response = await dispatch(createBooking(formattedReservation)).unwrap();
        // Mostrar notificación de éxito
        toast.success('Reserva creada exitosamente', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } catch (error) {
        console.error('Error creating booking:', error);
        // Mostrar notificación de error
        toast.error('Error al crear la reserva', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoadingMessage(`Error en la reservación ${i + 1}/${reservations.length}`);
        break;
      }
    }
    setLoading(false);
  
    // Restablecer el estado de reservations para tener solo un campo de reservación
    setReservations([
      { startDate: new Date(), endDate: new Date(), startTime: null, endTime: null, eventName: '', comment: '' },
    ]);
  };

  return (
    <div style={containerStyle}>
      <ToastContainer />
      <h2 style={{ marginTop: '20px', marginBottom: '40px' }}>Reservar {RoomName}</h2>
      {loading && (
          <Box mt={2} display="flex" flexDirection="column" alignItems="center">
            <CircularProgress />
            <Typography variant="body1" mt={2}>{loadingMessage}</Typography>
          </Box>
        )}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {reservations.map((reservation, index) => (
            <Grid item xs={12} key={index}>
              <Box component="div" sx={{ marginBottom: 1 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <TextField
                          label="Nombre del Evento"
                          value={reservation.eventName}
                          onChange={(e) => handleEventNameChange(index, e.target.value)}
                          fullWidth
                          margin="normal"
                        />
                      </TableCell>
                      <TableCell>
                        <DatePicker
                          selected={reservation.startDate}
                          onChange={(date) => handleDateChange(index, date)}
                          dateFormat="yyyy-MM-dd"
                          placeholderText="Fecha de Entrada"
                          disabled={!isEnabled}
                          showMonthDropdown
                          showYearDropdown
                          scrollableYearDropdown
                          dropdownMode="select"
                          customInput={<TextField fullWidth />}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          select
                          label="Hora de Entrada"
                          value={reservation.startTime}
                          onChange={(e) => handleTimeChange(index, e.target.value, true)}
                          fullWidth
                          margin="normal"
                        >
                          {hours.map((hour) => (
                            <MenuItem key={hour} value={hour}>
                              {hour}:00
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                      <TableCell>
                        <TextField
                          select
                          label="Hora de Fin"
                          value={reservation.endTime}
                          onChange={(e) => handleTimeChange(index, e.target.value, false)}
                          fullWidth
                          margin="normal"
                        >
                          {hours.map((hour) => (
                            <MenuItem key={hour} value={hour} disabled={hour < reservation.startTime}>
                              {hour}:00
                            </MenuItem>
                          ))}
                        </TextField>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Comentario"
                          value={reservation.comment}
                          onChange={(e) => handleCommentChange(index, e.target.value)}
                          fullWidth
                          margin="normal"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => removeReservation(index)} disabled={index === 0}>
                          <DeleteIcon />
                        </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                onClick={addReservation}
                style={{
                  marginTop: '30px',
                  backgroundColor: '#36A2EB',
                  boxShadow: 'none',
                  border: 'solid #36A2EB',
                  width: '100%',
                }}
                variant="contained"
                fullWidth
              >
                Agregar Reservación
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                style={{
                  marginTop: '30px',
                  backgroundColor: 'red',
                  boxShadow: 'none',
                  border: 'solid red',
                  width: '100%',
                }}
                type="submit"
                variant="contained"
                disabled={!isEnabled}
                fullWidth
              >
                Reservar
              </Button>
            </Grid>
          </Grid>
        </form>

      </div>
    );
  };

export default ReservationForm;