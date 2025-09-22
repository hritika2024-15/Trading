import React from 'react';

function Education() {
    return ( 
      
        <div className="container p-5">
            <div className="row p-5">
                <div className="col-6 p-5">
                    <img src="media/images/education.svg"/>
                </div>
                <div className="col-6 p-5">
                    <h1 className="mb-5">Free and open market education</h1>
                          <div className="mb-3">
                    <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href="" >Varsity <i class="fa-solid fa-arrow-right"></i></a></div>

                    <div className="mb-3">
                    <p>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href="">TradingQ&A<i class="fa-solid fa-arrow-right"></i></a></div>
                </div>
            </div>
        </div>
     );
}

export default Education;
