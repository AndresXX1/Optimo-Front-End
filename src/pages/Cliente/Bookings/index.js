import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../../Redux/reducer/bookings';

const BookingsComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState('');
  const dispatch = useDispatch();
  const bookingsFromRedux = useSelector((state) => state.bookings.bookings);
  const noReservationsMessage = "No hay reservas disponibles";
  const state = useSelector((state) => state);
  console.log("Estado Redux completo:", state);
  console.log("Estado Redux de reservas:", bookingsFromRedux);
  console.log("ID de usuario:", userId);
  console.log("fdsffds",bookingsFromRedux );

  useEffect(() => {
    const userIdFromLocalStorage = JSON.parse(localStorage.getItem('decodedToken'));
    if (userIdFromLocalStorage && userIdFromLocalStorage.userId) {
      console.log("Enviando petición para obtener reservas del usuario...");
    
      dispatch(fetchBookings({ filter: 'user', userId: userIdFromLocalStorage.userId }));
      setUserId(userIdFromLocalStorage.userId);
    }
  }, [dispatch]);

  useEffect(() => {
    
    if (Array.isArray(bookingsFromRedux)) {
      console.log("Actualizando estado local con las reservas del Redux:", bookingsFromRedux);
      setBookings(bookingsFromRedux);
    }
  }, [bookingsFromRedux]);

  return (
    <div>
      <h2>Tabla de reservas</h2>
      {bookings.length === 0 && (
        <Box sx={{ backgroundColor: 'salmon', padding: 2, marginBottom: 2, maxWidth: "500px", borderRadius:"10px"}}>
          <Typography variant="body1">{noReservationsMessage}</Typography>
        </Box>
      )}
      <TableContainer component={Paper} sx={{ maxWidth: "1300px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Titulo</TableCell>
              <TableCell>Token de reserva</TableCell>
              <TableCell>Inicio</TableCell>
              <TableCell>Fin</TableCell>
              <TableCell>Notas</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                
                <TableCell>{booking.tittle}</TableCell>
                <TableCell>{booking.bookingToken}</TableCell>
                <TableCell>{new Date(booking.startTime).toLocaleString()}</TableCell>
                <TableCell>{new Date(booking.endingTime).toLocaleString()}</TableCell>
                <TableCell>{booking.comment}</TableCell>
                <TableCell>{booking.state}</TableCell>
                <TableCell>
                  <Button disabled><CancelIcon /> Cancelar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BookingsComponent;