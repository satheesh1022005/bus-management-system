import React from "react";
import {Link} from "react-router-dom";
import './live.css';
import data from '../data/data';
import BusSchedule from "./busSchedule";
function Live(){
    const[buses,setBuses]=React.useState(data);
    const[view,setView]=React.useState([true,true,true,true,true,true,true,true,true,true]);
    console.log(buses);
    const busData=buses.map((bus,index)=>{
        return(
            view[index] ? <div className="slides">
                <div className="slide-data">
                    <p>BUS NO:{bus.bus_no}</p>
                    <p>Driver name:{bus.driver_name}</p>
                    <p>Driver phoneno: {bus.driver_phno}</p>
                    <p>Bus destination: {bus.destination}</p>
                    <p>Current Location : {bus.stops[0].bus_stop}</p>
                    <p>Bus reg_no: {bus.bus_reg_no}</p>
                </div>
                <div className="slide-btn">
                    <button onClick={()=>{setView(prev=>!prev[index])}}>Live Location</button>
                </div>
            </div> : <BusSchedule schedule={bus} index={buses.indexOf(bus)}/>
        )
    })
    return(
        <div className="buses-container">
            {busData}
        </div>
    );
}
export default Live;