import React from 'react';
import './live.css'; // Import CSS file for styling

const BusStopTimeline = ({ stops }) => {
  return (
    <div className="timeline">
      <div className="line"></div> {/* Vertical line */}
      {stops.map((stop, index) => (
        <div key={index} className="stop">
          <div className="circle"></div> {/* Circle indicating stop */}
          <div className="stop-info">
            <h3>{stop.time}</h3>
            <p>{stop.bus_stop}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusStopTimeline;
