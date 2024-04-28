import React, { Component } from 'react';
import { Map as LeafletMap } from 'leaflet';
import {MapContainer,TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [
          ]
        };
      }
    
      componentDidMount() {
        const serverUrl = "ws://192.168.189.157:8080"; // WebSocket server URL
        const connection = new WebSocket(serverUrl);
    
        connection.onopen = () => {
          console.log("Connected to the server");
        };
    
        connection.onmessage = (event) => {
          // Parse the received data and update the state
          const newData = JSON.parse(event.data);
        this.setState({ data: newData });
        //   this.setState({ data: newData });
        console.log(newData);
        };
    
        this.websocketConnection = connection;
      }
    
    //   componentWillUnmount() {
    //     // Close the WebSocket connection when the component is unmounted
    //     this.websocketConnection.close();
    //   }

  render() {
    const { data } = this.state;
    //console.log("Da ",data);
    return (
    <MapContainer center={[11.271316, 77.606153]} zoom={9.2} style={{ height: this.props.height, width: this.props.width }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {data.map((point, index) => {
            return (
                <Marker key={index} position={[point.current_latitude, point.current_longitude]}>
                <div>30</div>
                </Marker>
            );
            })}
  </MapContainer>
    );
  }
}

export default Map;
