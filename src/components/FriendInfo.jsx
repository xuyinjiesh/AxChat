import React, { useEffect, useState } from "react";
import test_img from "../assets/test-img.jpg"
import "../assets/FriendInfo.scss"

function FriendInfo() {
    let UName = "李四";
    let UID = "2";
    let USignature = "我是李四";

    function deleteFriends() { }

    function sendMessaage() { }

    return (
        <div className="FriendInfo">
            <div className="baseInfo">
                <img className="Portrait" src={test_img} />
                <div className="userInfo">
                    <h3 className="name">{UName}</h3>
                    <p className="ID">{UID}</p>
                </div>
            </div>
            <p className="signature">{USignature}</p>
            <div className="operations">
                <button className="confirm-button" onClick={sendMessaage}>发消息</button>
                <button className="confirm-button" onClick={deleteFriends}>删除好友</button>
            </div>
        </div>
    )
}

export default FriendInfo;