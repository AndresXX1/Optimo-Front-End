import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';

// localización de moment a español
moment.locale('es');

const ReservationCalendar = () => {
  // Función para obtener las reservas del mes actual (esto lo puedes adaptar a la logica real)
  const getReservationsForCurrentMonth = () => {
    //deberías tener la lógica para obtener las reservas del mes actual
    // Por ahora, usaremos datos de ejemplo quemados
    return [
      { id: 0, title: 'Piso 1 - Sala de conferencias', start: new Date(2024, 4, 20), end: new Date(2024, 4, 23) },
      { id: 1, title: 'Piso 2 - Cubículos', start: new Date(2024, 4, 26), end: new Date(2024, 4, 29) },
      { id: 2, title: 'Piso 4 - Oficinas 2 y 4', start: new Date(2024, 5, 3), end: new Date(2024, 5, 7) },
      { id: 3, title: 'Planta baja - Sala de reuniones', start: new Date(2024, 5, 10), end: new Date(2024, 5, 14) },
      { id: 4, title: 'Piso 3 - Oficinas 5-6-7-9-10', start: new Date(2024, 5, 11), end: new Date(2024, 5, 15) }
    ];
  };

  const localizer = momentLocalizer(moment);
  const reservations = getReservationsForCurrentMonth();
  const [hoveredReservation, setHoveredReservation] = useState(null);

  const getDayProp = (date) => {
    const today = moment();
    const isCurrentMonth = moment(date).isSame(today, 'month');
    const isBeforeToday = moment(date).isBefore(today, 'day');
    const isNextMonth = moment(date).isAfter(today.endOf('month'), 'day');

    if (!isCurrentMonth) {
      return {
        className: 'outside-month-day'
      };
    } else if (isBeforeToday || isNextMonth) {
      return {
        className: 'outside-month-day-next'
      };
    }

    return {};
  };

  const handleMouseOver = (event, reservation) => {
    setHoveredReservation(reservation);
  };

  const handleMouseOut = () => {
    setHoveredReservation(null);
  };

  return (
    <div style={{ height: 450 }}>
      <Calendar
     dsa
        localizer={localizer}
        events={reservations}
        views={['month']}
        startAccessor="start"
        endAccessor="end"
        dayPropGetter={getDayProp}
        style={{ maxWidth: 800, margin: 'auto' }}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      />
      {hoveredReservation && (
        <div style={{ position: 'absolute', top: hoveredReservation.y, left: hoveredReservation.x, backgroundColor: 'rgba(0, 0, 0, 0.8)', color: '#fff', padding: '5px', borderRadius: '5px' }}>
          <div>{hoveredReservation.title}</div>
          <div>{moment(hoveredReservation.start).format('DD/MM/YYYY')} - {moment(hoveredReservation.end).format('DD/MM/YYYY')}</div>
        </div>
      )}
      <style>{`
        .outside-month-day, .outside-month-day-next {
          background-color: #1002 !important;
          color: #222 !important;
        }

        .rbc-today {
          background-color: #36A2EB !important;
          color: #fff !important;
        }

        .rbc-btn-group > button {
          color: #36A2EB !important;
        }
      `}</style>
    </div>
  );
};

export default ReservationCalendar;