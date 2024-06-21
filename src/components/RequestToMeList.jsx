import React, { useEffect, useRef, useState, useContext } from "react";
import { UserContactContext } from "../context/UserContactContext";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { UserInfoContext } from "../context/UserInfoContext";
import { UserWsContext } from "../context/UserWsContext";

function RequestToMeList() {

    const [g_user] = useContext(UserInfoContext);
    const [setSocket, ready, val, send] = useContext(UserWsContext);
    const [requestToMeList, setRequestToMeList] = useState([]);
    const [userContact, setUserContact] = useContext(UserContactContext);

    useEffect(() => {
        fetch('/getReceiverRequests', {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if (response.ok) {
                return response.json(); // 假设返回的是一个 JSON 数据
            } else {
                throw new Error('查询出错');
            }
        }).then(data => {
            console.log(data);
            setRequestToMeList(data); // 假设 data 包含人名、ID、签名等属性
        }).catch(error => {
            console.error('Error searching friend:', error);
            setRequestToMeList([]);
        });
    }, []);

    function handleAccept(index) {
        let RSequence = requestToMeList[index].RSequence;
        fetch('/manageRequest', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ sequence: RSequence, IsAccepted: 1 })
        }).then(response => {
            if (response.ok) {
                alert("成功添加好友");
                return response.json(); // 返回解析后的 JSON 数据
            } else {
                throw new Error('添加好友出错');
            }
        }).then(data => {
            console.log(data);
            setUserContact(prevUserContact => ({
                ...prevUserContact,
                [data.FID]: data // 假设返回的 JSON 数据中有 UID
            }));
            
            // 发送一个空消息
            const now = new Date().toISOString();
            const messageObject = {
                MToID: data.FID,
                MFromID: g_user.UID,
                MText: "",
                MTime: now,
                MGetMessage: 3,
                MIsMarkDown: false
            };
            if (ready) {
                send(JSON.stringify(messageObject));
            };

            // 此处可以执行更新界面的操作
            updateUIAfterAccept(index);
        }).catch(error => {
            console.error('Error adding friend:', error);
        });
    }

    function updateUIAfterAccept(index) {
        // 在状态更新后更新界面，确保状态是最新的
        console.log(userContact); // 这里的状态应该是最新的
        document.getElementsByClassName('RequestStatus')[index].innerHTML = "已同意";
    }

    function handleReject(index) {
        let RSequence = requestToMeList[index].RSequence;
        fetch('/manageRequest', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ sequence: RSequence, IsAccepted: 0 })
        }).then(response => {
            if (response.ok) {
                alert("成功拒绝好友请求");
                console.log(userContact);
                document.getElementsByClassName('RequestStatus')[index].innerHTML = "已拒绝";
            }
            else {
                throw new Error('拒绝好友请求出错');
            }
        }).catch(error => {
            console.error('Error adding friend:', error);
        });
    }

    return (
        <div className="RequestToMe">
            {
                requestToMeList.map((value, index) => (
                    <div className="FriendRequest" key={index} style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="FriendRequestName">
                            {value.RFromName}
                        </div>
                        <div className="RequestStatus">
                            <span className="StatusText">
                                {value.RIsAccepted === -1 ? '待处理' : value.RIsAccepted === 1 ? '已同意' : '已拒绝'}
                            </span>
                            {value.RIsAccepted === -1 && (
                                <>
                                    <button className="Button" onClick={() => handleAccept(index)}>
                                        同意
                                    </button>
                                    <button className="Button" onClick={() => handleReject(index)}>
                                        拒绝
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default RequestToMeList;