import React, { useState } from 'react';
//import './entry.css';

const EntryPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFinalPage, setIsFinalPage] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState(null); // Track selected container

  // Pages content with specific background images
  const pages = [
    {
      title: "Accept Incoming Multiple Source",
      description: "Lorem ipsum dolor sit amet consectetur. Feugiat dis diam quam urna lectus.",
      imgSrc: "control.jpg"
    },
    {
      title: "Connect Seamlessly",
      description: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
      imgSrc: "escape.jpg"
    },
    {
      title: "Real-time Data Sync",
      description: "Elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      imgSrc: "control.jpg"
    }
  ];

  const nextContent = {
    title: "Welcome to the Next Step",
    description: "This is the new content after completing all slides.",
    imgSrc: "../seller1.png" // You can add any background for this
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
  const handleContainerClick = (containerId) => {
    setSelectedContainer(containerId);
  };

  return (
    <div className='Mega'>
      {isFinalPage ? (
        <div className="final-page">
          <h1>{nextContent.title}</h1>
          <p>{nextContent.description}</p>
          <div className="square-container">
            {/* First Square */}
            <div 
              className={`square ${selectedContainer === 1 ? 'selected' : ''}`} 
              onClick={() => handleContainerClick(1)}
            >
              <p>Container 1</p>
            </div>

            {/* Second Square */}
            <div 
                style={{borderRadius:32}}
              className={`square ${selectedContainer === 2 ? 'selected' : ''}`} 
              onClick={() => handleContainerClick(2)}
            >
              <p>Container 2</p>
            </div>

            
          </div>
          <div className="go">
            <button className="go-button" onClick={() => alert('Process Finished!')}>
              Finish
            </button>
            </div>
        </div>
      ) : (
        <div className="login-container" style={{ backgroundImage: `url(${pages[currentPage].imgSrc})` }}>
          <div className="text-content">
            <h1 className="login-title">{pages[currentPage].title}</h1>
            <p className="login-description">{pages[currentPage].description}</p>
          </div>
          <div className="navigation">
            {/* Left Arrow (Inactive on first page unless it's final) */}
            <button 
              className={`arrow-left ${currentPage === 0 ? 'inactive' : ''}`}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              &#8592;
            </button>

            {/* Dots for page navigation */}
            <div className="dots">
              {pages.map((_, index) => (
                <span key={index} className={`dot ${index === currentPage ? 'active' : ''}`}></span>
              ))}
            </div>

            {/* Right Arrow or GO button */}
            {currentPage === pages.length - 1 ? (
              <button className="go-button" onClick={handleNextPage}>GO</button>
            ) : (
              <button className="arrow-right" onClick={handleNextPage}>&#8594;</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EntryPage;
