import React from 'react';
import { FaRobot, FaImage, FaCommentDots } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md'; // Import for arrow icons
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './BotPage.css';

const BotPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { username } = location.state || { username: "Guest#" + String(Math.floor(1000 + Math.random() * 9000)) };
    const handleTalkClick = () => {
        alert("Navigating to Parking Page..."); // You can replace this with actual navigation
    };

    const handleChatClick = () => {

        alert("Navigating to Chat with Bot...");
        navigate("/chat");
    };

    const handleSearchClick = () => {
        alert("Navigating to Map page...");
        navigate("/map");
    };



    return (
        <div className="bot-page">
            <header className="header">
                <div className="user-info">
                    <div className="avatar">
                        <img src="https://via.placeholder.com/40" alt="User Avatar" />
                    </div>
                    <span className="greeting">Hi, {username} 👋</span>
                </div>
            </header>
            <main className="main-content">
                <h1>How may I help <br /> you today?</h1>
                <div className="options">
                <div className="side-options">
                        <div className="option talk" onClick={handleTalkClick}>
                            <FaRobot className="icon" />
                            <span>Avail ParKing</span>
                            <MdArrowForward className="arrow-icon" />
                        </div>
                        <div className="option mall" onClick={handleSearchClick}>
                            <FaImage className="icon" />
                            <span>Shops in Mall</span>
                            <MdArrowForward className="arrow-icon" />
                        </div>
                    </div>
                    <div className="side-options">
                        <div className="option chat" onClick={handleChatClick}>
                            <FaCommentDots className="icon" />
                            <span>Chat with Bot</span>
                            <MdArrowForward className="arrow-icon" />
                        </div>
                        <div className="option search" onClick={handleSearchClick}>
                            <FaImage className="icon" />
                            <span>Mall map</span>
                            <MdArrowForward className="arrow-icon" />
                        </div>
                    </div>
                </div>
                <div className="history">
                    <h2>History</h2>
                    <div className="history-list">
                        <div className="history-item">
                            <FaRobot className="icon" />
                            <span>I need some UI inspiration for dark</span>
                        </div>
                        <div className="history-item">
                            <FaCommentDots className="icon" />
                            <span>I need some UI inspiration for dark</span>
                        </div>
                        <div className="history-item">
                            <FaImage className="icon" />
                            <span>I need some UI inspiration for dark</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BotPage;
