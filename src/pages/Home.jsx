import React from "react";
import ChatCorridor from "../components/ChatCorridor";
import ChatRoom from "../components/ChatRoom";
import '../assets/Home.scss';

function Home() {
  return (
    <div className="Home">
      <div className="HomeContainer">
        <ChatCorridor />
        <ChatRoom />
      </div>
    </div> 
  );
};

export default Home;