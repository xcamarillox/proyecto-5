import { useState, useEffect } from "react";

import { Card, Form, Input, Button, Checkbox } from 'antd';

const SignForm = () => {
  const [signMode, setSignMode] = useState('signIn');

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleLink = () => {
    if (signMode==='signIn') setSignMode('signUp')
    else setSignMode('signIn')
  };

  return (
    <div style={{width:'100%', display:'flex', justifyContent:'center', alignContent:'center'}}>
      <Card 
        title={ signMode==='signIn'? 'Accede': 'Registrate' } 
        headStyle={{display:'flex', justifyContent:'center'}} 
        style={{ maxWidth: 800, width:'100%' }}
      >
        <Form
          name="basic"
          labelWrap
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ remember: true }}
          onFinish={ onFinish }
          onFinishFailed={ onFinishFailed }
          autoComplete="off"
        >
          { signMode==='signUp' && 
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          }
          <Form.Item
            label="E-mail"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          { signMode==='signUp' && 
            <Form.Item
              label="Confirma tu Contraseña"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
          }
          <Form.Item
            wrapperCol={{
              sm:{
                offset: 7,
                span: 10
              }
            }}
          >
            <Button type="primary" htmlType="submit" block>
              { signMode==='signIn'? 'Acceder': 'Registrame' }
            </Button>
              { signMode==='signIn'? 
                <>
                  Aún sin una cuenta? <a onClick={handleLink}>Crea una!</a>
                </>: 
                <>
                  Ya registrado? <a onClick={handleLink}>Accede</a>
                </> 
              }
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignForm;