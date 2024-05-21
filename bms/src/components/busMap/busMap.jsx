import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
function BusMap({ data, user }) {
    const [busPosition, setBusPosition] = useState([data.current_latitude, data.current_longitude]);
    const intervalRef = useRef(null);
    let newlat=busPosition[0];
    let newlon=busPosition[1];
    // useEffect(() => {
    //     trackVehicle();
    // },[])
    const busIcon = new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/4899/4899316.png',
        iconSize: [35, 35], 
        iconAnchor: [17, 35], 
        popupAnchor: [0, -35] 
    });
    
    const destinationIcon = new L.Icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/3710/3710297.png',
        iconSize: [35, 35], 
        iconAnchor: [17, 35], 
        popupAnchor: [0, -35] 
    });
    useEffect(() => {
        return () => {
            
            clearInterval(intervalRef.current);
        };
    }, []);
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // earth radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180; 
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a =
            0.5 - Math.cos(dLat) / 2 +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            (1 - Math.cos(dLon)) / 2;
    
        return R * 2 * Math.asin(Math.sqrt(a));
    }   

    function trackVehicle() {
       
        clearInterval(intervalRef.current);

        const interval = 1000; 

    
        intervalRef.current = setInterval(() => {

            const dx = user.longitude - busPosition[1];
            const dy = user.latitude - busPosition[0];

            const distance = Math.sqrt(dx * dx + dy * dy);

            const speed = 50/3600; 
            const dirX = dx / distance * speed;
            const dirY = dy / distance * speed;
            newlat+=dirY;
            newlon+=dirX;
            
            setBusPosition(prevPosition => [    
                prevPosition[0] + dirY,
                prevPosition[1] + dirX
            ]);
            const newDistance = calculateDistance(user.latitude, user.longitude, newlat, newlon);
            console.log(newDistance);
            if (newDistance < 1) { 
                clearInterval(intervalRef.current);
                alert('The bus has arrived!');
                axios.post('http://localhost:8080/send-sms', {
                    body:"hello satheesh, you are very near to the bus",
                    to:"+918489402448",
                })
            }
        }, interval);
    }

    return (
        <div className='bus-map-container'>
            <MapContainer center={[user.latitude, user.longitude]} zoom={9.2} style={{ height: "400px", width: "400px" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={busPosition} icon={busIcon}>
                    <Popup>Bus no: {data.id}</Popup>
                </Marker>
                <Marker position={[user.latitude, user.longitude]} icon={destinationIcon}>
                    <Popup>User</Popup>
                </Marker>
            </MapContainer>
            <div className='track'>
                <button className='track-btn' onClick={trackVehicle}>Track the bus</button>
            </div>
        </div>
    );
}

export default BusMap;
