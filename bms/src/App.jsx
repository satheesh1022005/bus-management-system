import React  from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from "./components/home/nav";
import Body from "./components/home/body";
import Bot from "./components/bot/bot";
import Live from "./components/buses/live";
import Map from "./components/map/map";
import BusSchedule from "./components/buses/busSchedule";
import BusLive from "./components/busLive/busLive";
function App(){
  return(
    <Router>
    <Routes>
      <Route path="/" element={
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
      <Route path="/map" element={<><Map height="100vh" width="100vw"/></>}
      />
      <Route path="/bus" element={<><BusLive/></>}
      />
    </Routes>
  </Router>
  );
}
export default App;