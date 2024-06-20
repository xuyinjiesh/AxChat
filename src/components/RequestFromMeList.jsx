import React, { useEffect, useRef, useState, useContext } from "react";
import { Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";

function RequestFromMeList() {
    const [requestFromMeList, setRequestFromMeList] = useState([]);

    useEffect(() => {
        fetch('/getSenderRequests', {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if (response.ok) {
                return response.json(); // 假设返回的是一个 JSON 数据
            } else {
                throw new Error('查询出错');
            }
        }).then(data => {
            // 成功获取数据后更新状态，每个结果包括人名、ID、签名等信息
            setRequestFromMeList(data); // 假设 data 包含人名、ID、签名等属性
        }).catch(error => {
            console.error('Error searching friend:', error);
            setRequestFromMeList([{ RToName: '查询出错', RIsAccepted: 10 }]);
        });
    }, []);


    return (
        <div className="RequestFromMe">
            {requestFromMeList.map((value, index) => (
                <div className="FriendRequest" key={index} style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="FriendRequestName">
                        {value.RToName}
                    </div>
                    <div className="RequestStatus">
                        <span className="StatusText">
                            {value.RIsAccepted === -1 ? '待处理' : value.RIsAccepted === 1 ? '已同意' : '已拒绝'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RequestFromMeList;