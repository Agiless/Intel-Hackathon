import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './entry.css';

const EntryPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFinalPage, setIsFinalPage] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null); // Track selected container
  const [containerId, setid] = useState(0);
  const navigate = useNavigate();

  // Pages content with specific background images
  const pages = [
    {
      title: "Know what is around you!!!",
      description: "We show the store around you and the stores throughtout the mall.",
      imgSrc: "image1.png"
    },
    {
      title: "Real-time Data Sync",
      description: "See throught the data of the stores and know the products and their prices.",
      imgSrc: "image2.png"
    },
    {
      title: "Connect Seamlessly",
      description: "Immediate response to customers enhancing user experience.",
      imgSrc: "image3.png"
    }
  ];

  const nextContent = {
    title: "Welcome to the Next Step",
    description: "Choose the side in which you would like to continue.",
    imgSrc: "next.png" // You can add any background for this
  };

  const handleNextPage = () => {
    if (currentPage === pages.length - 1) {
      setIsFinalPage(true); // Set the final page flag to true
    } else {
      setCurrentPage((prevPage) => (prevPage + 1) % pages.length); // Move to the next page
    }
  };

  const handlePrevPage = () => {
    if (isFinalPage) {
      setIsFinalPage(false); // Go back from the final page
    } else {
      setCurrentPage((prevPage) => (prevPage - 1 + pages.length) % pages.length); // Move to the previous page
    }
  };

  // Handle selection of square container
  const handleContainerClick = (c) => {
    setSelectedContainer(c);
    setid(c);
  };

  const handleFinishClick = () => {
    if (containerId===1){
      navigate('/login');
    }else{
      navigate('/sales');
    }
     // Navigate to LoginPage when Finish button is clicked
  };

  return (
    <div className="login-container" style={{ backgroundImage: `url(${isFinalPage ? nextContent.imgSrc : pages[currentPage].imgSrc})` }}>
      <div className="text-content">
        <h1 className="login-title">{isFinalPage ? nextContent.title : pages[currentPage].title}</h1>
        <p className="login-description">{isFinalPage ? nextContent.description : pages[currentPage].description}</p>
      </div>

      {isFinalPage ? (
        <>
          <div className="square-container">
            {/* First Square */}
            <div 
              className={`square ${selectedContainer === 1 ? 'selected' : ''}`} 
              onClick={() => handleContainerClick(1)}
              style={{backgroundColor:'blue',borderRadius: "50%"}}
            >
              <p style={{color:'black',fontFamily:'arial'}}>User Login</p>
            </div>

            {/* Second Square */}
            <div 
              className={`square ${selectedContainer === 2 ? 'selected' : ''}`} 
              onClick={() => handleContainerClick(2)}
              style={{backgroundColor:'blue',borderRadius: "50%"}}
            >
              <p style={{color:'black',fontFamily:'arial'}}>Seller Login</p>
            </div>
          </div>

          {/* Finish Button */}
          <div className="finish-button-container">
            <button 
              className={`finish-button ${!selectedContainer ? 'disabled' : ''}`} 
              onClick={handleFinishClick}
              disabled={!selectedContainer} // Disabled when no container is selected
            >
              Finish
            </button>
          </div>
        </>
      ) : (
        <div className="navigation">
          {/* Left Arrow (Inactive on first page unless it's final) */}
          <button 
            className={`arrow-left ${currentPage === 0 && !isFinalPage ? 'inactive' : ''}`}
            onClick={handlePrevPage}
            disabled={currentPage === 0 && !isFinalPage}
          >
            &#8592;
          </button>
          
          {/* Dots for page navigation */}
          <div className="dots">
            {!isFinalPage && pages.map((_, index) => (
              <span key={index} className={`dot ${index === currentPage ? 'active' : ''}`}></span>
            ))}
          </div>
          
          {/* Right Arrow or GO/Finish button */}
          {isFinalPage ? (
            <div className="finish-button-container">
              <button 
                className={`finish-button ${!selectedContainer ? 'disabled' : ''}`} 
                onClick={handleFinishClick}
                disabled={!selectedContainer} // Disabled when no container is selected
              >
                Finish
              </button>
            </div>
          ) : (
            currentPage === pages.length - 1 ? (
              <button className="go-button" onClick={handleNextPage}>GO</button>
            ) : (
              <button className="arrow-right" onClick={handleNextPage}>&#8594;</button>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default EntryPage;
