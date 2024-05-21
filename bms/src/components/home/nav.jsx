import React from "react";
import './nav.css';
import { Link } from "react-router-dom";
function Nav(){
    return(
        <nav className="navbar">
            <div className="logo">
                <h1 className="logo-name">KEC BUSES</h1>
            </div>
            <div className="features">
                <ul>
                    <Link to="/map" style={{ textDecoration: 'none' }}><li>Map</li></Link>
                    <li>Live locations</li>
                    <li>book a ticket</li>
                    <li>About</li>
                </ul>
            </div>
        </nav>
    );
}
export default Nav;