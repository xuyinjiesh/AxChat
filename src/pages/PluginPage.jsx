/**
 * @author Yinjie Xu
 * @version 0.1
 * @date 2024-06-21
 */

import { Button, Col, Divider, Layout, Menu, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";
import '../assets/PluginPage.scss';
import test_img from "../assets/test-img.jpg"

const items = [
  { key: '1', label: <Link to="installed">已安装</Link> },
  { key: '2', label: <Link to="all">全部</Link> },
];

const style = {
  background: '#0092ff',
  padding: '8px 0',
};
 
function PluginPage() {
  return (
    <div id="PluginSystemContainer" style={{ width: '100%', padding: "10px"}}>
      <Layout>
        <Header style={{ backgroundColor: 'rgb(245, 245, 245)'}}>
          <Menu
            items={items}
            mode="horizontal"
            theme="light"
            color="rgb(245, 245, 245)"
            defaultSelectedKeys={['1']}
          />
        </Header>
        <Divider orientation="left">已安装</Divider>
        <Row gutter={10}>
          <Col className="gutter-row" span={6}>
            <div className="PluginContainer">
              <img className="Icon" src={test_img} />
              <div className="Info">
                <p className="Name">翻译</p>
                <p className="Description">一键翻译全文</p>
                <Button className="btn-uninstall">卸载</Button>
              </div>
            </div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={6}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
      </Layout>
    </div>
  );
}

export default PluginPage;


