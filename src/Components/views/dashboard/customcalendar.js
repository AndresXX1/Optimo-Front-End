import React from 'react';
import moment from 'moment';

const CustomReservationEvent = ({ event }) => {
 const { title, start, end } = event;
 const startMoment = moment(start);
 const endMoment = moment(end);
 const isSameDay = startMoment.isSame(endMoment, 'day');
 const duration = endMoment.diff(startMoment, 'days');
 const points = duration > 0 ? duration + 1 : 1;

 return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {Array.from({ length: points }).map((_, index) => (
        <div key={index} style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'blue', marginBottom: '2px' }}></div>
      ))}
      {points > 6 && <div style={{ fontSize: '10px' }}>+{points - 6} more</div>}
    </div>
 );
};

export default CustomReservationEvent;