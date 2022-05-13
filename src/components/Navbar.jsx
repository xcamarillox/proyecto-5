import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import { Menu } from "antd";
import { HomeOutlined, FilterOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';

const Navbar = (props) => {
  const navigate = useNavigate();
  const items = [
    { label: 'Home', key:"home", icon:<HomeOutlined />},
    { label: 'Movies Filter', key:"filter", icon:<FilterOutlined /> },
    { label: 'Movie', key:"movie", icon:<CheckCircleOutlined /> },
    { label: 'Sign In/Sign Up', key:"sign", icon:<UserOutlined /> }
  ]

  const onClickHandler = (params) => navigate("/"+params.key.trim(), { replace: true });
  
  return <Menu mode="horizontal"
          selectedKeys={[props.selectedPath]} 
          className='navbar'
          items={items} 
          onClick={ onClickHandler }/>;
};

export default Navbar;