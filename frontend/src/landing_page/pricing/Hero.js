import React from 'react';

function Hero() {
    return (
       <div classNmae="container">
        <div className="row text-center border-bottom m-5 p-5">
          <h1>Charges</h1>
          <p>List of all charges and taxes</p>
        </div>
        <div className="row" style={{marginLeft:"10%",marginRight:"10%",marginBottom:"3%"}}>
          <div className="col-4 text-center">
            <img src="media/images/pricing-eq.svg" style={{width:"70%"}}/>
            <h2>Free equity delivery</h2>
            <p className="text-muted mt-3">All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
          </div>
          <div className="col-4 text-center">
            <img src="media/images/other-trades.svg" style={{width:"70%"}}/>
            <h2>Intraday and F&O trades</h2>
            <p className="text-muted mt-3">Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
          </div>
          <div className="col-4 text-center">
            <img src="media/images/pricing-eq.svg" style={{width:"70%"}}/>
            <h2>Free direct MF</h2>
            <p className="text-muted mt-3">All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
          </div>
        </div>
       </div>
      );
}

export default Hero;