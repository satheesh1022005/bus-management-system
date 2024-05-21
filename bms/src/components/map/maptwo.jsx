import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker,Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

class MapTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data });
        }
    }

    render() {
        const { data } = this.state;
        //console.log("Data: ", data);
        return (
            <MapContainer center={[11.271316, 77.606153]} zoom={9.2} style={{ height: this.props.height, width: this.props.width }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {data.map((point, index) => (
                    <Marker key={index} position={[
                        point.current_latitude !== undefined ? point.current_latitude : 11.271316,
                        point.current_longitude
                    ]}>
                        <Popup>Bus no:{point.id}</Popup>
                    </Marker>
                ))}
            </MapContainer>
        );
    }
}

export default MapTwo;
