import React from 'react';

function Pricing() {
    return ( 
    <div className="container p-5">
        <div className="row p-5">
            <div className="col-6 p-5">
                <h1 className="fs-2 mb-5">Unbeatable pricing</h1>
                <p className="  text-muted mb-5">We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                <a href="" style={{textDecoration:"none"}}>See pricing<i class="fa-solid fa-arrow-right"></i></a>
            </div>
            <div className="col-6 p-5">
                <div className="row text-center">
                    <div className="col-4 px-3"><img src="media/images/pricing-eq.svg"/>
                    <p className="text-muted fs-6 fw-light  ">Free account opening</p></div>
                      <div className="col-4 px-3"><img src="media/images/pricing-eq.svg"/>
                      <p className="text-muted fs-6 fw-light">Free equity delivery
                        and direct mutual funds</p></div>
                        <div className="col-4 px-3"><img src="media/images/other-trades.svg"/>
                        <p className="text-muted fs-6 fw-light"> Intraday and
                             F&O</p></div>
                </div>
                
            </div>
        </div>
    </div>
    );
}

export default Pricing;