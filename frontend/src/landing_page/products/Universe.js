import React from 'react';

function Universe() {
    return (  
        
        <div className="container" style={{marginTop:"10%"}}>
            <div className="row text-center mx-5">
                <div style={{marginBottom:"50px"}}>
                <h1>The Zerodha Universe</h1>
                <p>Extend your trading and investment experience even further with our partner platforms</p></div>
                <div className="col-4 p-3 mb-3 text-center">
                    <img src="media/images/zerodhaFundhouse.png" style={{width:"50%",marginBottom:"25px"}}/>
                    <p>Our asset management venture
                      that is creating simple and transparent index
                      funds to help you save for your goals.

                       </p>

                       <img src="media/images/streakLogo.png" style={{width:"50%",marginBottom:"25px"}}/>
                    <p>Systematic trading platform
                    that allows you to create and backtest
                       strategies without coding.

                       </p>
                </div>
                 <div className="col-4 p-3 mb-3 text-center">
                     <img src="media/images/sensibullLogo.svg" style={{width:"60%" ,marginBottom:"25px", marginTop:"10px"}}/>
                    <p>Options trading platform that lets you
create strategies, analyze positions, and examine
data points like open interest, FII/DII, and more.


                       </p>

                        <img src="media/images/smallcaseLogo.png" style={{width:"60%",marginBottom:"25px", marginTop:"20px"}}/>
                    <p>Thematic investing platform
that helps you invest in diversified
baskets of stocks on ETFs.

                       </p>
                 </div>
                  <div className="col-4 p-3 mb-3 text-center">
                     <img src="media/images/tijori.svg" style={{width:"40%",marginBottom:"25px"}}/>
                    <p>Investment research platform
that offers detailed insights on stocks,
sectors, supply chains, and more.


                       </p><br/>

                        <img src="media/images/dittoLogo.png" style={{width:"40%",marginBottom:"25px"}}/>
                    <p>Personalized advice on life
and health insurance. No spam
and no mis-selling.

                       </p>
                  </div>
                              <button className="btn btn-primary p-2 fs-5 mb-5 " style={{width:"15%",margin:"0 auto"}}>Sign up for free</button>
            </div>

        </div>
    );
}

export default Universe;