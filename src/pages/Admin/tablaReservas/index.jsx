import React, { useEffect, useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button, 
  CircularProgress,
  Typography,
  Grid,
  Container
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookings } from '../../../Redux/reducer/reducer.js';

const BookingsComponent = () => {
  const dispatch = useDispatch();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingsData = async () => {
      setLoading(true);
      try {
        const response = await dispatch(fetchBookings());
        setBookings(response.payload);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchBookingsData();
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Tabla de reservas</Typography>
      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : error ? (
        <Typography variant="body1" color="error" gutterBottom>
          Error al cargar las reservas: {error.message}
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Token de reserva</TableCell>
                <TableCell>Inicio</TableCell>
                <TableCell>Fin</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Habitación</TableCell>
                <TableCell>Comentario</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings && bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.bookingToken}</TableCell>
                  <TableCell>{booking.startTime}</TableCell>
                  <TableCell>{booking.endingTime}</TableCell>
                  <TableCell>{booking.state}</TableCell>
                  <TableCell>{booking.user}</TableCell>
                  <TableCell>{booking.room}</TableCell>
                  <TableCell>{booking.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default BookingsComponent;