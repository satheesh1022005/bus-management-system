import React from "react";
import axios from "axios";
import Map from "../map/map";
import './busLive.css';
function BusLive() {
    const[data,setData]=React.useState({
        id:"",
        current_latitude:"",
        current_longitude:"",
    });
    function handleFormSubmit(e) {
        e.preventDefault();
        console.log(data);
        const ws = new WebSocket("ws://192.168.189.157:8080");
        ws.onopen = () => {
          ws.send(JSON.stringify(data));
          ws.close();
        };
      }
      
    function handleChange(e){
        setData({...data,[e.target.name]:e.target.value});
    }
    return(
        <div className="BusLive-container">
            <div className="map-container">
            <Map height="100vh" width="1200px"/>
            </div>
            <div className="geoLoc-container">
                <form onSubmit={handleFormSubmit}>
                        <input
                            type="number"
                            id="id"
                            placeholder="id"
                            name="id"
                            value={data.id}
                            onChange={handleChange}
                            min={1}
                            max={10}
                        />
                        <input
                            type="text"
                            id="current_latitude"
                            placeholder="current_latitude"
                            name="current_latitude"
                            value={data.current_latitude}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="current_longitude"
                            placeholder="current_longitude"
                            name="current_longitude"
                            value={data.current_longitude}
                            onChange={handleChange}
                        />
                        <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
export default BusLive;