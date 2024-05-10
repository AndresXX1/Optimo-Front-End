import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Filter() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(true); // Inicializa open como true

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setOpen(false); // Cierra el calendario después de seleccionar una fecha
  };

  const toggleCalendar = () => {
    setOpen(!open); // Esto ya no es necesario si open se controla directamente desde DatePicker
  };

  return (
    <ButtonGroup style={{ boxShadow: "0 0 5px rgba(0, 0, 0, 0.8)", border: "1px solid  gray", borderRadius: "20px", height:"80px",width:"auto" }} variant="text" color="primary" aria-label="text primary button group">
      <Button style={{  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{color:"white",marginLeft:"40px",marginRight:"40px"}}>ordenar</span>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>por piso</span>
      </Button>
      <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>Check -in</span>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>¿cuando?</span>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          customInput={<Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}  />}
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown
          dropdownMode="select"
         
          onClose={() => setOpen(false)} // Cierra el calendario cuando se cierra
        />
      </Button>
      <Button style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>Filtrar</span>
        <span style={{color:"white", marginLeft:"40px",marginRight:"40px"}}>por piso</span>
      </Button>
    </ButtonGroup>
  );
}