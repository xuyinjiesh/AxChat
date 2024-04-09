import React from "react";
import test_img from "../assets/test-img.jpg"

function ChatCorridor() {
  return (
    <div className="ChatCorridor">
      <div className="ChatBriefWrapper">
        <img className="Portrait" src={test_img} />
        <div className="Info">
          <div className="NameAndTime">
            <div className="Name">ChatGPT</div>
            <div className="Time">昨天</div>
          </div>
          <div className="Message">朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。</div>
        </div>
      </div>

      <div className="ChatBriefWrapper">
        <img className="Portrait" src={test_img} />
        <div className="Info">
          <div className="NameAndTime">
            <div className="Name">李四</div>
            <div className="Time">昨天</div>
          </div>
          <div className="Message">在吗</div>
        </div>
      </div>

    </div>
  );
};

export default ChatCorridor;