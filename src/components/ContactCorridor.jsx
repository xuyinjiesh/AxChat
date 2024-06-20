import React, { useContext, useEffect, useState } from "react";
import { Avatar, Input, Menu } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { calc } from "antd/es/theme/internal";
import { Form, json, useNavigate } from "react-router-dom";
import { UserInfoContext } from '../context/UserInfoContext';
import { UserContactContext } from "../context/UserContactContext";


function ContactCorridor({ sidebarWidth }) {
    const [g_user] = useContext(UserInfoContext);
    const [g_contacts, setContacts] = useContext(UserContactContext);

    const navigate = useNavigate();

    const RequestMenu = [
        {
            key: 'grp',
            label: '新的好友',
            type: 'group',
            children: [
                {
                    key: 'searchFriend',
                    label: '添加好友',
                },
                {
                    key: 'requestToMe',
                    label: '收到的请求',
                },
                {
                    key: 'requestFromMe',
                    label: '发送的请求',
                },
            ],
        }
    ]

    const onClick = (e) => {
        navigate(e.key);
    };

    const enterFriendInfo = (key) => {
        navigate("/contact/" + key);
    }

    return (
        <div className="ChatCorridor" style={{
            width: sidebarWidth,
            flex: `0 0 ${sidebarWidth}px`,
        }}>
            <Menu
                onClick={onClick}
                style={{
                    width: '100%',
                }}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={RequestMenu}
            />
            {
                Object.entries(g_contacts).map(([key, value]) => (
                    <div className="ChatBriefWrapper" key={key} onClick={() => enterFriendInfo(key)}>
                        <Avatar className="Portrait">{value.FName}</Avatar>
                        <div className="Info">
                            <div className="NameAndTime">
                                <div className="Name">{value.FName}</div>
                            </div>
                            <span className="Message">{value.FSignature}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ContactCorridor;