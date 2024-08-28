// src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Row, Col } from 'antd';
import forgotPasswordImage from '../assets/ilustracionLogin.png'; // Asegúrate de tener una imagen en esta ruta

const { Title } = Typography;

const ForgotPasswordPage = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el correo');
      }

      message.success('Si el correo coincide con una cuenta registrada, se enviará un mensaje para restablecer la contraseña.');
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
          src={forgotPasswordImage}
          alt="Forgot Password"
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
          <Title level={2} style={{ textAlign: 'center', color: '#ffffff', fontSize: '28px' }}>Restablecer Contraseña</Title>
          <Form
            name="forgot-password"
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

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', fontSize: '16px', height: '45px' }}>
                Enviar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ForgotPasswordPage;