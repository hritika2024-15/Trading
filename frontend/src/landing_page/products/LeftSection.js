import React from 'react';

function LeftSection({
    imageURL,
    productName,
    productDescription,
    tryDemo,
    learnMore,
    googlePlay,
    appStore})
     {
    return ( 
        <div className="container ml-5 mr-5 px-5">
            <div className="row ">
                <div className="col-6 p-3">
                    <img src={imageURL}/>
                </div>
                  <div className="col-6 p-3"style={{marginTop:"8%"}}>
                    <h1>{productName}</h1>
                    <p>{productDescription}</p>
                    <div className='mb-3'>
                        <a href={tryDemo} style={{textDecoration:"none"}}>Try Demo<i class="fa-solid fa-arrow-right"></i></a>
                    <a href={learnMore} style={{marginLeft:"15%", textDecoration:"none"}}>Learn More<i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                    
                    <div>
                    <a href={googlePlay} ><img src="media/images/googlePlayBadge.svg"/></a>
                    <a href={appStore} style={{marginLeft:"6%" }}><img src="media/images/appstoreBadge.svg"/></a></div>
                  </div>
            </div>
        </div>
     );
}

export default LeftSection;