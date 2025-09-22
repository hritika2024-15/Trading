import React from 'react';

function CreateTicket() {
    return ( 
      <div className="container p-5 mb-5">
        <div className="row ">
            <h4 className="mt-5">To create a ticket, select a relevant topic</h4>
            
        </div>
        <div className="row ">
          <div className="col-4 p-4 ">
          <h5><i class="fa-solid fa-circle-plus mx-2 my-2"></i>Account Opening</h5>
          <p className="mx-4 fs-6"><a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Resident individual</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Minor</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Non Resident Indian (NRI)</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Company, Partnership, HUF and LLP</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Glossary</a></p>
          </div>
            <div className="col-4 p-4">
               <h5><i class="fa-regular fa-user mx-2 my-2"></i>Your Zerodha Account</h5>
          <p className="mx-4 fs-6"><a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Your Profile</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Account modification</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Client Master Report (CMR) and Depository Participant (DP)</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Nomination</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Transfer and conversion of securities</a></p> 
            </div>
              <div className="col-4 p-4 ">
                <h5><i class="fa-solid fa-chart-simple mx-2 my-2"></i>Kite</h5>
          <p className="mx-4 fs-6"><a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>IPO</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Trading FAQs</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Margin Trading Facility (MTF) and Margins</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Charts and orders</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Alerts and Nudges</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>General</a></p>
              </div>
            
        </div>


        <div className="row ">
          <div className="col-4 p-4">
          <h5><i class="fa-solid fa-wallet mx-2 my-2"></i>Funds</h5>
          <p className="mx-4 fs-6"><a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Add money</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Withdraw money</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Add bank accounts</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>eMandates</a></p>
          </div>
            <div className="col-4 p-4">
               <h5><i class="fa-solid fa-dharmachakra mx-2 my-2"></i>Console</h5>
          <p className="mx-4 fs-6"><a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Portfolio</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Corporate actions</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Funds statement</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Reports</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Profile</a><br/>
                            <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Segments</a><br/></p> 
            </div>
              <div className="col-4 p-4">
                <h5><i class="fa-solid fa-circle-notch mx-2 my-2"></i>Coin</h5>
          <p className="mx-4 fs-6"><a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Mutual Funds</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>National Pension Scheme (NPS)</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Features on Coin</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>Payments and Orders</a><br/>
              <a href="" style={{textDecoration:"none",lineHeight:"2.3rem"}}>General</a></p>
              </div>
            
        </div>
       </div>
     );
}

export default CreateTicket;