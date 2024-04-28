import React from 'react';
import BusStopTimeline from './busStopTimeline'; // Import the BusStopTimeline component
import './live.css';
const BusSchedule = ({schedule,index}) => {
  return (
    <div>
      {
        <div>
          <h2>Route {schedule.route_no}</h2>
          <h3>Destination: {schedule.destination}</h3>
          <BusStopTimeline stops={schedule.stops} /> {/* Pass stops data to BusStopTimeline component */}
        </div>
      }
    </div>
  );
};

export default BusSchedule;
