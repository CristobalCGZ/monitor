// src/pages/DashboardPage.js
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

const DashboardPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Inicio</Menu.Item>
          <Menu.Item key="2">Empresas</Menu.Item>
          <Menu.Item key="3">Suscripciones</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Contenido del Dashboard
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Leasyta ©2024 Creado por Cristóbal Carrasco
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
