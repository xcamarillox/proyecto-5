import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, Form, Input, Button } from 'antd';

const SignForm = () => {
  const [form] = Form.useForm();
  const [signMode, setSignMode] = useState('signin');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(()=>{
    form.resetFields();
    const locationSplit = location.pathname.split('/')[1];
    if (locationSplit != 'signup') setSignMode('signin')
    else setSignMode('signup')
  }, [location])

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleLink = () => {
    if (signMode==='signin') navigate("/signup", { replace: true });
    else navigate("/signin", { replace: true });
  };

  return (
    <div style={{width:'100%', display:'flex', justifyContent:'center', alignContent:'center'}}>
      <Card 
        title={ signMode==='signin'? 'Sign In': 'Sign Up' } 
        headStyle={{display:'flex', justifyContent:'center', backgroundColor: '#2E3696', color:'#F7EC40' }} 
        style={{ maxWidth: 800, width:'100%', margin:10 }}
      >
        <Form
          form={form}
          name="basic"
          labelWrap
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          initialValues={{ remember: true }}
          onFinish={ onFinish }
          onFinishFailed={ onFinishFailed }
          autoComplete="off"
        >
          { signMode==='signup' && 
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
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
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
          { signMode==='signup' && 
            <Form.Item
              label="Confirm your password"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
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
              { signMode==='signin'? 'Access': 'Sign Me Up' }
            </Button>
              { signMode==='signin'? 
                <>
                  Still without an account? <a onClick={handleLink}>Sign Up!</a>
                </>: 
                <>
                  Already registered? <a onClick={handleLink}>Sign In</a>
                </> 
              }
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignForm;