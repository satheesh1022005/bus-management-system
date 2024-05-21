import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import '../../../AnimatedMarker.js'; // Make sure this path is correct
import './moveMap.css';
import { Link } from 'react-router-dom';

function MoveMap({ busData }) {
  const[mes,setMes]=useState("");
  const mapRef = useRef(null);
  const[arr,setArr]=useState([0,0,0]);
  const[min,setMin]=useState(Infinity);
  const mapInstance = useRef(null);
  const [router, setRouter] = useState([]);
  const[minBus,setMinBus]=useState("");
  const [currentPosition, setCurrentPosition] = useState(null);  // State to track the current position of the bus
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        0.5 - Math.cos(dLat) / 2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon)) / 2;

    return R * 2 * Math.asin(Math.sqrt(a));
} 
const busIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/4899/4899316.png',
  iconSize: [35, 35], 
  iconAnchor: [17, 35], 
  popupAnchor: [0, -35] 
});
  const destinationIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/14377/14377336.png',
    iconSize: [35, 35], 
    iconAnchor: [17, 35], 
    popupAnchor: [0, -35] 
  });
  const userIcon = new L.Icon({
    iconUrl: 'https://img.icons8.com/?size=512&id=g4MZHlvH55Tn&format=png',
    iconSize: [35, 35], 
    iconAnchor: [17, 35], 
    popupAnchor: [0, -35] 
  });
  const stopIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/9830/9830829.png',
    iconSize: [35, 35], 
    iconAnchor: [17, 35], 
    popupAnchor: [0, -35] 
  });

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([11.274166, 77.606088], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapInstance.current);
      
      L.circle([11.274166, 77.606088], {
        radius: 2000, 
        color: 'red',
        fillColor: '#f03', 
        fillOpacity: 0.3, 
        weight:1
      }).addTo(mapInstance.current);
      const temp=[];
      const extraMarkerLatLng = L.latLng(11.274166, 77.606088); 
      const extraMarker = L.marker(extraMarkerLatLng, {icon: destinationIcon}).addTo(mapInstance.current);
      const extraMarkerLatLng2 = L.latLng(11.24553, 77.519540); 
      const extraMarker2 = L.marker(extraMarkerLatLng2, {icon: userIcon}).addTo(mapInstance.current);
      const extraMarkerLatLng3 = L.latLng(11.235341128220156, 77.4836204352368); 
      const extraMarker3 = L.marker(extraMarkerLatLng3, {icon: stopIcon}).addTo(mapInstance.current);
      const extraMarkerLatLng4 = L.latLng(11.214116309264892, 77.4905051060418); 
      const extraMarker4 = L.marker(extraMarkerLatLng4, {icon: stopIcon}).addTo(mapInstance.current);
      const extraMarkerLatLng5 = L.latLng(11.237289527791669, 77.66161630019815); 
      const extraMarker5 = L.marker(extraMarkerLatLng5, {icon: stopIcon}).addTo(mapInstance.current);
      extraMarker.bindPopup('Destination').openPopup();
      
      busData.slice(0, 3).forEach(bus => {
        const routeControl = L.Routing.control({
          waypoints: [
            L.latLng(bus.current_latitude, bus.current_longitude),
            L.latLng(11.274166, 77.606088)
          ],
          routeWhileDragging: false,
          createMarker: () => null
        }).addTo(mapInstance.current);

        routeControl.on('routesfound', function (e) {
          const routes = e.routes;
          const line = L.polyline(routes[0].coordinates, { color: 'blue' }).addTo(mapInstance.current);
          const animatedMarker = L.animatedMarker(line.getLatLngs(), {
            distance: 300,
            interval: 300,
            icon: busIcon,
            onEnd: () => console.log('Animation finished'),
            autoStart: true
          }).bindPopup(`Bus ID: ${bus.id}`);
          mapInstance.current.addLayer(animatedMarker);

          // Start animation and update current position
          animatedMarker.start();
          animatedMarker.on('move', function(e) {
            setCurrentPosition(e.latlng);  // Update state on every move
            //console.log('Current position:', e.latlng.lat,e.latlng.lng);
            console.log('bus id',bus.id);  // Console log the current position
            const dis=calculateDistance(e.latlng.lat,e.latlng.lng,11.274166, 77.606088);
            if(dis<1){
              console.log(`${bus.id} is reached it's destination\nfor next bus navigate to Find nearby bus page`);  
              //alert(`${bus.id} is reached`);
              setArr(prev=>[...prev,prev[bus.id-1]=1]);
              setMes(bus.id);
            }
            let dis2=calculateDistance(e.latlng.lat,e.latlng.lng,11.274166, 77.606088);
            console.log(dis2);
            //if(minBus===mes){setMinBus(2)}
            if(min>dis2){
              setMin(prev=>dis2);
              if(arr[bus.id-1]===0)
                setMinBus(bus.id);
            }

          });
          temp.push(routes);
        });
      });

      setRouter(temp);

      return () => {
        router.forEach(r => r.remove());  // Cleanup routes
      };
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [busData]); // Dependency array includes busData to update on data change

  return (
    <div className="map-container">
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      <div className='message container'>{mes.length>0?mes:""} {mes.length>0 && "bus has reached the destination.To find next Bus,naviagte to find nearby bus page"}</div>
      <div className='message moved'>the nearest bus is {minBus.length>0?minBus:""}</div>
      <div className="button-container">
        <Link to="/findbus" className="link-design-no"><button className="find-bus-button">Find Nearby Bus</button></Link>
      </div>
    </div>
  );
}

export default MoveMap;
