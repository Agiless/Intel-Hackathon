// src/components/VideoBackground.js

import React from 'react';
import './video.css'; // Import your CSS file
import Content from "./BotPage.js";

const VideoBackground = () => {
    return (
        <div className="video-background">
            <video autoPlay muted loop>
                <source src={`${process.env.PUBLIC_URL}/path/to/your/video.mp4`} type="video/mp4" />
                <source src={`${process.env.PUBLIC_URL}/path/to/your/video.webm`} type="video/webm" />
                Your browser does not support the video tag.
            </video>
            <div className="content">
                <Content />
            </div>
        </div>
    );
};

export default VideoBackground;
