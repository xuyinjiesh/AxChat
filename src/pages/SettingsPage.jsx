/**
 * @author Ruoxi Wang
 * @version 0.1
 * @date 2024-06-21
 */

import React, { useContext, useState, useEffect } from "react";
import { UserInfoContext } from '../context/UserInfoContext';
import "../assets/SettingPage.scss"

function SettingsPage() {
    const [user, setUser] = useContext(UserInfoContext);
    const [UName, setUName] = useState('Original name');
    const [USignature, setSignature] = useState('Original signature');

    useEffect(() => {
        setUName("昵称:" + user.UName);
        setSignature("签名:" + user.USignature);
    }, [user]);


    function changeNickname() {
        let newname = document.getElementById("new-nickname").value;
        console.log(user);
        console.log(newname);

        fetch('/changeName', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ name: newname })
        }).then(response => {
            if (response.ok) {
                console.log(response.text());
                showMessage('昵称更改成功');
                document.getElementById("nickname").innerHTML = "昵称:" + newname;
                setUser({ ...user, "UName": newname});

            }

            else {
                showMessage('昵称更改失败');
            }

        }).catch(error => {
            console.error('Error uploading nickname:', error);
            showMessage('昵称更改失败');
        });
    }

    function changeSignature() {
        let newsignature = document.getElementById("new-signature").value;
        fetch('/changeSignature', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ signature: newsignature })
        }).then(response => {
            if (response.ok) {
                console.log(response.text());
                showMessage('签名更改成功');
                document.getElementById("signature").innerHTML = "签名:" + newsignature;
                setUser({ ...user, "USignature": newsignature });
            }

            else {
                showMessage('签名更改失败');
            }

        }).catch(error => {
            console.error('Error uploading signature:', error);
            showMessage('签名更改失败');
        });
    }

    function showMessage(message) {
        const messageDiv = document.getElementById('sys_message');
        messageDiv.textContent = message;
    }

    function changePassword() {
        let newpassword = document.getElementById("first-password").value;
        let verification = document.getElementById("second-password").value;

        if (newpassword !== verification) {
            showMessage('两次输入的密码不一致');
            return;
        }

        fetch('/changePassword', {

            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ password: newpassword })

        }).then(response => {
            if (response.ok) {
                showMessage('密码更改成功');
            }

            else {
                showMessage('密码更改失败');
            }

        }).catch(error => {
            console.error('Error uploading nickname:', error);
            showMessage('密码更改失败');
        });
    }

    return (
        <div className="SettingsPage">
            <h1>用户信息修改与设置</h1>
            <div className="all">
                <div className="setting-item">
                    <h4 id="nickname">{UName}</h4>
                    <input type="text" id="new-nickname" />
                    <button className="confirm-button" onClick={changeNickname}>确认修改</button>
                </div>
                <br></br>
                <div className="setting-item">
                    <h4 id="signature">{USignature}</h4>
                    <input type="text" id="new-signature" />
                    <button className="confirm-button" onClick={changeSignature}>确认修改</button>
                </div>
                <br></br>
                <div className="setting-item">
                    <h4>修改密码</h4>
                    <input type="password" id="first-password" />
                    <input type="password" id="second-password" />
                    <button className="confirm-button" onClick={changePassword}>确认修改</button>
                </div>
                <br></br>
                <div id="sys_message"></div>
                <br></br>
                <div className="setting-item">
                    <button className="confirm-button">登出</button>
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;