import React, { useState } from 'react';
import { Input, Button, Tooltip, Avatar } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function FriendSearch() {
    const [searchResults, setSearchResults] = useState({ UID: -1, UName: '', USignature: '' });

    function searchFriend() {
        let target = document.getElementById("searchInput").value;
        if (target === "") {
            return;
        }
        let targetId = parseInt(target);

        fetch('/searchUser', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ ID: targetId })
        }).then(response => {
            if (response.ok) {
                return response.json(); // 假设返回的是一个 JSON 数据
            } else {
                throw new Error('查询出错');
            }
        }).then(data => {
            // 成功获取数据后更新状态，每个结果包括人名、ID、签名等信息
            console.log(data);
            setSearchResults(data); // 假设 data 包含人名、ID、签名等属性
        }).catch(error => {
            console.error('Error searching friend:', error);
            setSearchResults({ UID: -1, UName: '查询出错', USignature: '' });
        });
    }

    function handleConfirm(id) {
        // 处理确认按钮点击事件，例如可以发送确认请求等
        console.log(`确认按钮点击，确认用户 ID: ${id}`);
        fetch('/saveRequest', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ toID: id })
        }).then(response => {
            if (response.ok) {
                return response.text();
            }

            else {
                console.log(response.text());
                alert('好友请求发送失败');
            }

        }).then(data => {
            alert(data);
        }).catch(error => {
            console.error('Error uploading nickname:', error);
            alert('好友请求发送失败');
        });
    }

    return (
        <div className="FriendSearch">
            <div className="SearchHeader" style={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="search">
                    <Button type="primary" shape="circle" icon={<SearchOutlined />} onClick={searchFriend} />
                </Tooltip>
                <Input placeholder="搜索"
                    style={{ margin: "10px", width: `100px` }}
                    id="searchInput"
                />
            </div>

            <div className="SearchResults" style={{ width: '100%' }}>
                {/* 映射每个结果为一个 <div> */}
                <div className="search-result-item" style={{ display: 'flex', alignItems: 'center' }}>
                    {searchResults.UID !== -1 && <Avatar className="Portrait">{searchResults.UName}</Avatar>}
                    <div className="Info" style={{ display: 'flex', direction: 'column' }}>
                        <div className="Name">{searchResults.UName}</div>
                        <span className="Message">{searchResults.USignature}</span>
                    </div>
                    {searchResults.UID !== -1 && <Button type="primary" onClick={() => handleConfirm(searchResults.UID)}>确认</Button>}
                </div>
            </div>
        </div>
    )
}

export default FriendSearch;