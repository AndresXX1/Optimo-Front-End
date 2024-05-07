import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import Modal from 'react-modal'; // Asegúrate de tener react-modal instalado


// localización de moment a español
moment.locale('es');

const localizer = momentLocalizer(moment);

const ReservationCalendar = () => {
 const [events, setEvents] = useState([]);
 const [modalIsOpen, setModalIsOpen] = useState(false);
 const [selectedEvent, setSelectedEvent] = useState(null);

 useEffect(() => {
    const generateReservations = () => {
      const reservations = [];
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(startDate.getMonth() + 1); // Genera reservas para el próximo mes

      for (let i = 0; i < 50; i++) {
        const start = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        const end = new Date(start.getTime() + Math.random() * (endDate.getTime() - start.getTime()));
        // Establece las horas de inicio y fin de manera aleatoria
        start.setHours(Math.floor(Math.random() * 24));
        end.setHours(start.getHours() + Math.floor(Math.random() * 8)); // Asegura que la reserva no exceda las 8 horas
        const color = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        // Ajusta el título del evento para incluir la hora de inicio y la hora de fin
        const title = `Reserva ${i + 1} - ${moment(start).format('HH:mm')} a ${moment(end).format('HH:mm')}`;
        reservations.push({ id: i, title, start, end, color });
      }
      return reservations;
    };

    const reservations = generateReservations();
    setEvents(reservations);
 }, []);

 const eventStyleGetter = (event) => {
 const style = {
     backgroundColor: event.color,
     borderRadius: '50%',
     height: '8px', // Reducir el tamaño
     width: '8px', // Reducir el tamaño
     margin: 'auto',
 };
 return {
     style: style,
 };
 };

 const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
 };

 const closeModal = () => {
    setModalIsOpen(false);
 };

 return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleSelectEvent}
        views={['agenda']} // Solo muestra la vista de "agenda"
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles de la Reserva"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            backgroundColor: '#fff',
            color: '#000',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            maxWidth: '500px',
            maxHeight: '400px',
            margin: 'auto',
          },
        }}
      >
        {selectedEvent && (
          <>
            <h2>Detalles de la Reserva</h2>
            <p>Título: {selectedEvent.title}</p>
            <p>Inicio: {moment(selectedEvent.start).format('DD/MM/YYYY HH:mm')}</p>
            <p>Fin: {moment(selectedEvent.end).format('DD/MM/YYYY HH:mm')}</p>
            <p>Color: {selectedEvent.color}</p>
          </>
        )}
        <button onClick={closeModal}>Cerrar</button>
      </Modal>
    </div>
 );
};

export default ReservationCalendar;