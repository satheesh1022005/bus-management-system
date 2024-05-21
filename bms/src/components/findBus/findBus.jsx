import React, { useState, useEffect } from "react";
import './findBus.css';
import BusMap from "../busMap/busMap";
function FindBus({ busData }) {
    const [latitude, setLatitude] = useState(11.245653);
    const [longitude, setLongitude] = useState(77.519400);
    const [placeName, setPlaceName] = useState("");
    const[nearestBus,setNearesetBus]=useState([]);
    // useEffect(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             position => {
    //                 const { latitude, longitude } = position.coords;
    //                 setLatitude(latitude);
    //                 setLongitude(longitude);
    //                 fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
    //                     .then(response => response.json())
    //                     .then(data => {
    //                         console.log(data.display_name);
    //                         setPlaceName(data.display_name);
    //                     })
    //                     .catch(error => {
    //                         console.error('Error:', error);
    //                     });
                    
    //             },
    //             error => {
    //                 console.error("Error getting geolocation:", error);
    //             }
    //         );
    //     } else {
    //         console.error("Geolocation is not supported by this browser.");
    //     }
    // }, []);
    /// Haversine formula
    useEffect(()=>{
        findNearestBus();
    },[])
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
    // function findNearestBus() {
    //     //  nearestBus = busData.reduce((prev, curr) => {
    //     //     const prevDistance = calculateDistance(prev.current_latitude, prev.current_longitude, latitude, longitude);
    //     //     const currDistance = calculateDistance(curr.current_latitude, curr.current_longitude, latitude, longitude);
    //     //     return prevDistance < currDistance ? prev : curr;
    //     // });
    //     // console.log(nearestBus);
    //     const distanceArray=[];
    //     let near="";
    //     let min=Infinity;
    //     busData.forEach((bus,index) => {
    //         const distance = calculateDistance(latitude, longitude, bus.current_latitude, bus.current_longitude);
    //         distanceArray.push({distance: distance});
    //         if(distance<min){
    //             min=distance;
    //             near=bus;
    //         }
    //     })
    //     const arrivalTime=min/50;
    //     const arrivalTimeInMinutes = Math.round(arrivalTime * 60);
    //     console.log(distanceArray);
    //     fetch(`https://nominatim.openstreetmap.org/reverse?lat=${near.current_latitude}&lon=${near.current_longitude}&format=json`)
    //                     .then(response => response.json())
    //                     .then(data => {
    //                         console.log(data.display_name);
    //                         setNearesetBus({
    //                             ...near,
    //                             placeName: data.display_name,
    //                             view:true,
    //                             arrivalTimeInMinutes: arrivalTimeInMinutes
    //                         });
    //                     })
    //                     .catch(error => {
    //                         console.error('Error:', error);
    //                     });
    //     console.log(nearestBus.id);
        
    // }
    function locationName(latitude, longitude) {
        return fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            .then(response => response.json())
            .then(data => {
                console.log(data.display_name);
                return data.display_name;
            })
            .catch(error => {
                console.error('Error:', error);
                return "";
            });
    }
    
    async function findNearestBus() {
        const sortedBusData = [...busData];
        sortedBusData.sort((a, b) => {
            const distanceA = calculateDistance(latitude, longitude, a.current_latitude, a.current_longitude);
            const distanceB = calculateDistance(latitude, longitude, b.current_latitude, b.current_longitude);
            return distanceA - distanceB;
        });
    
        const nearestBuses = await Promise.all(sortedBusData.map(async (bus) => {
            const distance = calculateDistance(latitude, longitude, bus.current_latitude, bus.current_longitude);
            const arrivalTime = distance / 50;
            const arrivalTimeInMinutes = Math.round(arrivalTime * 60);
            const locName = await locationName(bus.current_latitude, bus.current_longitude);
            return {
                ...bus,
                distance,
                locName,
                arrivalTimeInMinutes
            };
        }));
    
        setNearesetBus(nearestBuses);
    }
    return (
        <div className="find-bus">
            <h2>User's Current Location</h2>
            {latitude && longitude ? (
                <div>
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                    {placeName && <p>Location: {placeName}</p>}
                </div>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={findNearestBus}>Find Bus</button>
            {nearestBus.length>=1 && 
                nearestBus.map((bus,index)=>{
                    return(
                        <div className={index===0?"nearest-bus back-color":"nearest-bus"} key={index}>
                            <div className="bus-details">
                            <p>Bus Registration Number: {bus.bus_reg_no}</p>
                            <p>Current Location Name : {bus.locName}</p>
                            <p>Approximate Arrival time to your location : {bus.arrivalTimeInMinutes} minutes</p>
                            <p>Current Latitude: {bus.current_latitude}</p>
                            <p>Current Longitude: {bus.current_longitude}</p>
                            <p>Destination: {bus.destination}</p>
                            <p>Driver Name: {bus.driver_name}</p></div>
                            <div className="bus-map">
                            <BusMap data={bus} user={{latitude,longitude}}/>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default FindBus;
