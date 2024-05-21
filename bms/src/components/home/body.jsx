import React from "react";
import './body.css'
import live from '../../assets/live.jpg';
import ticket from '../../assets/ticket.png';
import fees from '../../assets/fees.png';
import {Link} from "react-router-dom";
function Body(){
    return(
        <div className="card-container">
                <div className="card">
                    <Link to="/movemap" className="link-design-no">
                    <section className="card-img">
                        <img src={live} alt="card1" width="320px" height="270px"></img>
                    </section>
                    <h2>Live Locations</h2>
                    <p>View live locations of KEC buses for accurate tracking.</p>
                    </Link>
                </div>
                <div className="card">
                <Link to="/findbus" className="link-design-no">
                    <section className="card-img">
                        <img src={ticket} alt="card1" width="320px" height="270px"></img>
                    </section>
                    <h2>Find nearby Bus</h2>
                    <p>Book tickets for KEC trip buses seamlessly through our platform.</p>
                    </Link>
                </div>
                <div className="card">
                    <section className="card-img">
                        <img src={fees} alt="card1" width="320px" height="270px"></img>
                    </section>
                    <h2>Fees payments</h2>
                    <p>Pay your fees conveniently through our KEC transport system payment window</p>
                </div>
                </div>
    );
}
export default Body;