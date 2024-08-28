// src/pages/ResetPasswordPage.js
import React, { useState } from 'react';
import { Form, Input, Button, Typography, message, Row, Col } from 'antd';
import resetPasswordImage from '../assets/ilustracionLogin.png'; // Asegúrate de tener una imagen en esta ruta
import { useParams } from 'react-router-dom';

const { Title } = Typography;

const ResetPasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useParams(); // Obtenemos el token desde la URL

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3001/api/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('No se pudo restablecer la contraseña');
      }

      message.success('Contraseña restablecida exitosamente');
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
          src={resetPasswordImage}
          alt="Reset Password"
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
            name="reset-password"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label={<span style={{ color: '#ffffff', fontSize: '16px' }}>Nueva Contraseña</span>}
              name="password"
              rules={[{ required: true, message: 'Por favor ingrese su nueva contraseña' }]}
            >
              <Input.Password placeholder="Ingrese su nueva contraseña" size="large" style={{ fontSize: '14px', height: '40px' }} />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: '#ffffff', fontSize: '16px' }}>Confirmar Contraseña</span>}
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Por favor confirme su contraseña' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Las contraseñas no coinciden'));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirme su nueva contraseña" size="large" style={{ fontSize: '14px', height: '40px' }} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading} style={{ backgroundColor: '#1890ff', borderColor: '#1890ff', fontSize: '16px', height: '45px' }}>
                Restablecer Contraseña
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default ResetPasswordPage;

