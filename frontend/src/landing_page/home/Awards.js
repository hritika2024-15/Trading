import React from 'react';

function Awards() {
    return ( 
       <div className="container mt-5">
        <div className="row">
            <div className="col-6">
                <img src="/media/images/largestBroker.svg"/>
            </div>
            <div className="col-6 p-5 mt-3">
                <h1>Largest stock broker in India</h1>
                <p>2+ million zerodha clients contribute to over 15% of all retail order volumes in India daily by trading and investing in: </p>
                <ul>
                    <div className="row">
                        <div className="col-6">
                    <li><p>Futures and Options</p></li>
                    <li><p>Commodity Derivatives</p></li>
                    <li><p>Currency Derivatives</p></li>
                        </div>
                        <div className="col-6">
                    <li><p>Stocks & IPOs</p></li>
                    <li><p>Direct Mutual Funds</p></li>
                    <li><p>Bonds & Govt. Securities</p></li>
                        </div>
                   
                 
                    </div>
                </ul>
                <img src="/media/images/pressLogos.png" style={{width:"90%"}}/>
            </div>
        </div>
       </div>
     );
}

export default Awards;