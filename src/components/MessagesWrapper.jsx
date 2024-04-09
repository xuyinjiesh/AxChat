import React from "react";
import test_img from "../assets/test-img.jpg";
import '../assets/MessagesWrapper.scss';


function MessagesWrapper() {
  return (
    <div className="MessagesWrapper">
       
      <div className="MessageWrapper owner">
        <div className="PortraitWrapper">
          <img className="Portrait" src={test_img} />
        </div>
        <p className="Message">介绍一下《早发白帝城》这首诗</p>
      </div>
      
      <div className="MessageWrapper">
        <div className="PortraitWrapper">
          <img className="Portrait" src={test_img} />
        </div>
        <p className="Message">这是一首唐代诗人李白所作的诗词：朝辞白帝彩云间，千里江陵一日还。两岸猿声啼不住，轻舟已过万重山。全诗四句全在一个“流”字，以体现诗人遇赦之后，从此海阔天空的爽快心情。</p>
      </div>
    </div>
  );
};

export default MessagesWrapper;