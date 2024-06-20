import React, { useEffect, useState, useContext } from "react";
import { Avatar } from "antd";
import { useLoaderData, useParams } from "react-router-dom";
import { UserContactContext } from "../context/UserContactContext";
import "../assets/FriendInfo.scss"

function FriendInfo() {
    const FID = parseInt(useParams().friendId);
    const [g_contacts, setContacts] = useContext(UserContactContext);
    let FName = g_contacts[FID].FName;
    let FSignature = g_contacts[FID].FSignature;

    function deleteFriends(FID) {
        fetch('/deleteFriend', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ ID: FID })
        }).then(response => {
            if (response.ok) {
                alert("成功删除好友");

            } else {
                throw new Error('删除好友出错');
            }
        }).catch(error => {
            console.error('Error adding friend:', error);
        });
    }

    function sendMessaage() { }

    return (
        <div className="FriendInfo">
            <div className="baseInfo">
                <Avatar className="Portrait">{FName}</Avatar>
                <div className="userInfo">
                    <h3 className="name">{FName}</h3>
                    <p className="ID">{FID}</p>
                </div>
            </div>
            <p className="signature">{FSignature}</p>
            <div className="operations">
                <button className="confirm-button" onClick={sendMessaage}>发消息</button>
                <button className="confirm-button" onClick={() => deleteFriends(FID)}>删除好友</button>
            </div>
        </div>
    )
}

export default FriendInfo;