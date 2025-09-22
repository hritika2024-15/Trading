import React from 'react';

function Hero() {
    return (
   <section className="container-fluid" id="supportHero">
    <div className="p-3" id="supportWrapper">
        <h3>Support Portal</h3>
        <a href="" style={{textDecoration:"none" ,color:"white"}}>Track Tickets</a>
    </div>

     <div className=" row p-3" id="supportcolumn">
        <div className=" col-6 pl-5  ">
            <h2 className='fs-4'>Search for an answer or browse help topics to create a ticket</h2>
            <input type="text" placeholder='Eg: how do I activate F&O,why is my order getting rejected...'/><br/>
           <a href="" style={{textDecoration:"none", color:"white"}} className="mx-3">Track account opening </a>
            <a href=""style={{textDecoration:"none", color:"white"}} className="mx-3"> Track segment activation </a> 
            <a href=""style={{textDecoration:"none", color:"white"}} className="mx-4"> Intraday margins</a> <br/>
             <a href=""style={{textDecoration:"none", color:"white",marginLeft:".9rem"}} > Kite user manual</a> 
        </div>

         <div className=" col-6 pl-5 ">
            <h2 className='fs-4'>Featured</h2>
            <ol>
                <li>
                 <a href="" style={{textDecoration:"none", color:"white"}} className="mx-3">Exclusion of F&O contracts on 8 securities from August 29, 2025</a>
                </li>

                <li>
            <a href=""style={{textDecoration:"none", color:"white"}} className="mx-3">Revision in expiry day of Index and Stock derivatives contracts</a> 
                </li>
            </ol>
           

        </div>
       
    </div>
   </section>
     );
}

export default Hero;