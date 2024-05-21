import React from "react";
import axios from "axios";
import Map from "../map/map";
import './busLive.css';
function BusLive(props) {
    //console.log("busLive:",props.busData);

    const[data,setData]=React.useState({
        id:"",
        current_latitude:"",
        current_longitude:"",
        unique_id:"",
    });
    function preprocess(){
        let uid=props.busData[data.id-1]._id;
        setData(prevData => ({ ...prevData, unique_id: uid }));
    }
    React.useEffect(() => {
        if (data.id !== "" && props.busData.length > 0 && data.id>=1 && data.id<=10) {
            let uid = props.busData[data.id - 1]._id;
            setData(prevData => ({ ...prevData, unique_id: uid }));
        }
    }, [data.id, props.busData]);
    
    function handleFormSubmit(e) {
        e.preventDefault();
        //preprocess();
        //console.log(data);
        //const uid = props.busData[data.id - 1]._id;
        //console.log(uid);
        
        // Update unique_id using the state updater function
        //setData(prevData => ({ ...prevData, unique_id: uid }));
        
        // Now, you can access the updated value of data
        console.log(data);
    
        if (data.unique_id !== "") {
            const ws = new WebSocket("ws://localhost:8080");
            ws.onopen = () => {
                ws.send(JSON.stringify(data));
                ws.close();
            };
        } else {
            alert("Enter valid id");
        }
    }
    
      
    function handleChange(e){
        // let uid=props.busData[data.id-1]._id;
        // if(uid===undefined) uid=0;
        setData({...data,[e.target.name]:e.target.value});
    }
    return(
        <div className="BusLive-container">
            <div className="map-container">
            <Map height="100vh" width="992px" data={props.busData}/>
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
                            required
                        />
                        <input
                            type="text"
                            id="current_latitude"
                            placeholder="current_latitude"
                            name="current_latitude"
                            value={data.current_latitude}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            id="current_longitude"
                            placeholder="current_longitude"
                            name="current_longitude"
                            value={data.current_longitude}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}
export default BusLive;