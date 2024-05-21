import React, { useEffect } from "react";
import './index.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "./components/home/nav";
import Body from "./components/home/body";
import Bot from "./components/bot/bot";
import Live from "./components/buses/live";
import Login from "./components/auth/login";
import Map from "./components/map/map";
import BusSchedule from "./components/buses/busSchedule";
import BusLive from "./components/busLive/busLive";
import FindBus from "./components/findBus/findBus";
import BusMap from "./components/busMap/busMap";
import MoveMap from "./components/move/moveMap";
function App(){
  const [data, setData] = React.useState([]);
  console.log(data);
  useEffect(() => {
    const serverUrl = "ws://localhost:8080";
    const connection = new WebSocket(serverUrl);

    connection.onopen = () => {
      console.log("Connected to the server");
    };

    connection.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    connection.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      connection.close();
    };
  }, []);
  return(
    <Router>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/home" element={
        <>
        <Nav/>
        <Body/>
        <Bot/>
        </>} />
      <Route path="/live" element={
        <>
        <Live/>
        </>
      }/>
      <Route path="/movemap" element={<><MoveMap busData={data}/></>}
      />
      <Route path="/map" element={<><Map height="100vh" width="100vw" data={data}/></>}
      />
      <Route path="/bus" element={<><BusLive busData={data}/></>}
      />
      <Route path="/findbus" element={<><FindBus busData={data}/></>}
      />
      <Route path="/busmap" element={<><BusMap data={data[0]} user={{latitude:11.70185,longitude:78.14476}}/></>}      />
    </Routes>
  </Router>
  );
}
export default App;