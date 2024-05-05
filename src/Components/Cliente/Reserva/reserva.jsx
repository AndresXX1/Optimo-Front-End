import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import data from "../../../api/api.json";
import { useRouter } from 'next/router';

const ReservationForm = (props) => {
 const router = useRouter();
 const [startDate, setStartDate] = useState(new Date());
 const [endDate, setEndDate] = useState(null);
 const [guests, setGuests] = useState('');
 const [isEnabled, setIsEnabled] = useState(false);
 const [RoomName, setRoomName] = useState('');
 const { id } = router.query;

 useEffect(() => {
    setIsEnabled(true);

   

    const hotel = data.find(item => item.id === parseInt(id));
    if (hotel) {
      setRoomName(hotel.Nombre);
    }
 }, [id]);

  

 const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Fecha de entrada:', format(startDate, 'yyyy-MM-dd'));
    console.log('Fecha de salida:', format(endDate, 'yyyy-MM-dd'));
    console.log('Cantidad de huéspedes:', guests);
 };

 const [containerStyle, setContainerStyle] = useState({
    border: "1px solid black",
    padding: "40px",
    marginBottom: "110px",
    width: "500px",
    height: "auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.8)", 
    borderRadius: "10px",
    position: "absolute", 
    marginLeft:"950px",
    marginBottom:"100px",
    marginTop:"-1250px",
    transform: "translate(-50%, -50%)", 
 });

 useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= 768) {
        setContainerStyle(prevStyle => ({
          ...prevStyle,
          marginLeft: 'calc(50% - 00px)',
          marginTop: 'calc(50% - -400px)',
          marginBottom:"40px"
        }));
      } else {
        setContainerStyle(prevStyle => ({
          ...prevStyle,
          marginLeft: '950px',
          marginTop: '-300px',
          marginBottom:"40px"
        }));
      }
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
 }, []);

 return (
    <div style={containerStyle}>
      <h2 style={{marginTop:"-20px", marginBottom:"10px"}}>Reservar {RoomName}</h2>
      <form onSubmit={handleSubmit}>
        <Box component="div" sx={{ marginBottom: 1 }}>
          <p>Huespedes</p>
          <TextField
            fullWidth
            label="Cantidad de Huéspedes"
            type="number"
            InputProps={{
              inputProps: {
                min: 1,
                max: 10,
              },
            }}
            disabled={!isEnabled}
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </Box>
        <Box component="div" sx={{ marginBottom: 1 }}>
          <p>Inicio de reserva</p>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Fecha de Entrada"
            disabled={!isEnabled}
            showMonthDropdown
            showYearDropdown
            scrollableYearDropdown
            dropdownMode="select"
            customInput={<TextField fullWidth />}
          />
        </Box>
        <Box component="div" sx={{ marginBottom: 1 }}>
          <p>Fin de reserva</p>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Fecha de Salida"
            minDate={startDate}
            disabled={!isEnabled}
            showMonthDropdown
            showYearDropdown
            scrollableYearDropdown
            customInput={<TextField fullWidth />}
          />
        </Box>
        <Button style={{marginTop:"30px",backgroundColor:"red",boxShadow:"none", border:"solid red"}} type="submit" variant="contained" disabled={!isEnabled} fullWidth>
          Reservar
        </Button>
      </form>
    </div>
 );
};

export default ReservationForm;