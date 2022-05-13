import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import { Menu } from "antd";
import { HomeOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Navbar = (props) => {
  const navigate = useNavigate();
  const items = [
    { label: 'Home', key:"home", icon:<HomeOutlined />},
    { label: 'Movies Filter', key:"filter", icon:<CheckCircleOutlined /> },
    { label: 'Movie', key:"movie", icon:<CheckCircleOutlined /> }
  ]

  const onClickHandler = (params) => navigate("/"+params.key.trim(), { replace: true });
  
  return <Menu mode="horizontal"
          selectedKeys={[props.selectedPath]} 
          className='navbar'
          items={items} 
          onClick={ onClickHandler }/>;
};

export default Navbar;