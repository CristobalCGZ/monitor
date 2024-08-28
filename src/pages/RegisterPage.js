// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import registerImage from '../assets/ilustracionLogin.png'; // Asegúrate de tener una imagen en esta ruta

const { Title } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      message.success('Registro exitoso');
      navigate('/');
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
          src={registerImage}
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
          <Title level={2} style={{ textAlign: 'center', color: '#ffffff', fontSize: '28px' }}>Registro</Title>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label={<span style={{ color: '#ffffff', fontSize: '16px' }}>Nombre</span>}
              name="name"
              rules={[{ required: true, message: 'Por favor ingrese su nombre' }]}
            >
              <Input placeholder="Ingrese su nombre" size="large" style={{ fontSize: '14px', height: '40px' }} />
            </Form.Item>

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
                Registrarse
              </Button>
            </Form.Item>
          </Form>
          <Button type="link" href="/" block style={{ color: '#ffffff', textAlign: 'center', fontSize: '14px' }}>
            ¿Ya tienes cuenta? Inicia sesión
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default RegisterPage;
