// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Row, Col } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/authContext';
import loginImage from '../assets/ilustracionLogin.png';

const { Title } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const { login } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Usuario o contraseña incorrectos');
      }

      const data = await response.json();
      login(data.token);
      message.success('Inicio de sesión exitoso');
      navigate('/dashboard');
    } catch (error) {
      message.error(error.message, 3);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row style={{ minHeight: '100vh' }}>
      <Col
        xs={0} sm={0} md={10}
        style={{ background: '#f0f2f5', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <img
          src={loginImage}
          alt="Licitation World"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Col>
      <Col
        xs={24} sm={24} md={14}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#001529', padding: '0 30px' }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <Title level={2} style={{ textAlign: 'center', color: '#ffffff', fontSize: '28px' }}>Iniciar Sesión</Title>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label={<span style={{ color: '#ffffff', fontSize: '16px' }}>Correo</span>}
              name="email"
              rules={[{ required: true, message: 'Por favor ingrese su correo electrónico' }]}
            >
              <Input placeholder="Ingrese su correo" size="large" style={{ fontSize: '14px', height: '40px' }} />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: '#ffffff', fontSize: '16px' }}>Contraseña</span>}
              name="password"
              rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
            >
              <Input.Password placeholder="Ingrese su contraseña" size="large" style={{ fontSize: '14px', height: '40px' }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', fontSize: '16px', height: '45px' }}>
                Iniciar Sesión
              </Button>
            </Form.Item>
          </Form>
          <div style={{ textAlign: 'center' }}>
            <Link to="/forgot-password" style={{ color: '#1890ff', fontSize: '14px' }}>
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Button type="link" href="/register" block style={{ color: '#ffffff', textAlign: 'center', fontSize: '14px' }}>
            ¿No tienes cuenta? Regístrate
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;
