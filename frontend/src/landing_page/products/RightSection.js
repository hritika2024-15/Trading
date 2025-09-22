import React from 'react';

function RightSection({productName,
    productDescription,
    imageURL,
linkInfo: {link,name}={}}) {
    return ( 
        <div className="container " style={{marginBottom:"35px"}}>
            <div className="row">
                <div className="col-6" style={{marginTop:"12%"}}>
                    <h1>{productName}</h1>
        <p>{productDescription}</p>
        <a href={link} style={{textDecoration:"none"}}>{name}<i class="fa-solid fa-arrow-right"></i></a>
        </div>
        <div className="col-6">
            <img src={imageURL}/>
        </div>
        
        </div> 
        </div>
    );
}

export default RightSection;