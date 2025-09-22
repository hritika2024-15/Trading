import React from 'react';

function Hero() {
    return (
      <div className="container p-5 mb-5">
        <div className="row text-center">
            <h1 className="mt-5 ">Zerodha Products</h1>
            <p className="text-muted font-weight-light fs-4 mt-3">Sleek, modern, and intuitive trading platforms</p>
            <p>Check out our <a href="" style={{textDecoration:"none"}}>investment offerings<i class="fa-solid fa-arrow-right"></i></a></p>
        </div>
       </div>
      );
}

export default Hero;