import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, IconButton, MenuItem, Table, TableBody, TableCell, TableRow } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import data from "../../../api/api.json";
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';

const ReservationForm = (props) => {
 const containerStyle = {
    margin: '20px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
 };

 const router = useRouter();
 const [reservations, setReservations] = useState([{ startDate: new Date(), endDate: new Date(), startTime: null, endTime: null, eventName: '' }]);
 const [isEnabled, setIsEnabled] = useState(false);
 const [RoomName, setRoomName] = useState('');
 const [eventName, setEventName] = useState('');
 const { id } = router.query;
 

 // Genera una lista de horas para usar en los select
 const hours = Array.from({ length: 24 }, (_, i) => i);

 useEffect(() => {
    setIsEnabled(true);

    const hotel = data.find(item => item.id === parseInt(id));
    if (hotel) {
      setRoomName(hotel.Nombre);
    }
 }, [id]);

 const handleDateChange = (index, date) => {
    const newReservations = [...reservations];
    newReservations[index].startDate = date;
    newReservations[index].endDate = date; // Asegura que la fecha de fin sea la misma que la fecha de inicio
    setReservations(newReservations);
 };

 const handleEventNameChange = (index, name) => {
  const newReservations = [...reservations];
  newReservations[index].eventName = name;
  setReservations(newReservations);
 };

 const handleTimeChange = (index, time, isStartTime) => {
  const newReservations = [...reservations];
  if (isStartTime) {
    newReservations[index].startTime = time;
  } else {
    // Asegura que la hora de fin no sea anterior o igual a la hora de inicio
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

    setReservations([...reservations, { startDate: newStartDate, endDate: newStartDate, startTime: null, endTime: null }]);
 };

 const removeReservation = (index) => {
    if (index === 0) {

      return;
    }

    const newReservations = [...reservations];
    newReservations.splice(index, 1);
    setReservations(newReservations);
 };

 const handleSubmit = (event) => {
    event.preventDefault();
    console.log(reservations);
 };


 return (
 <div style={containerStyle}>
    <h2 style={{ marginTop: "20px", marginBottom: "40px" }}>Reservar {RoomName}</h2>
    <form onSubmit={handleSubmit}>
                <Button onClick={addReservation} style={{ marginTop: "30px", backgroundColor: "#36A2EB", boxShadow: "none", border: "solid #36A2EB", width:"200px" }} variant="contained" fullWidth>
        Agregar Reservación
      </Button>
      {reservations.map((reservation, index) => (
        <Box key={index} component="div" sx={{ marginBottom: 1 }}>
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
                 {/* Select para la hora de inicio */}
                 <TextField
                 style={{width:"170px"}}
                    select
                    label="Hora de Entrada"
                    value={reservation.startTime}
                    onChange={(e) => handleTimeChange(index, e.target.value, true)}
                   
                 >
                    {hours.map((hour) => (
                      <MenuItem key={hour} value={hour}>
                        {hour}:00
                      </MenuItem>
                    ))}
                 </TextField>
                </TableCell>
                <TableCell>
                 {/* Select para la hora de fin */}
                 <TextField
                    select
                    label="Hora de Fin"
                    value={reservation.endTime}
                    onChange={(e) => handleTimeChange(index, e.target.value, false)}
                 >
                    {hours.map((hour) => (
                      <MenuItem key={hour} value={hour} disabled={hour < reservation.startTime}>
                        {hour}:00
                      </MenuItem>
                    ))}
                 </TextField>
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
      ))}

      <Button style={{ marginTop: "30px", backgroundColor: "red", boxShadow: "none", border: "solid red" }} type="submit" variant="contained" disabled={!isEnabled} fullWidth>
        Reservar
      </Button>
    </form>
 </div>
);
};

export default ReservationForm;
