import { useState } from "react";
import { Menu } from "antd";
import { HomeOutlined, CheckCircleOutlined } from '@ant-design/icons';

const Navbar = () => {
  
  const items = [
    { label: 'Home', key:"home", icon:<HomeOutlined />},
    { label: 'Filter', key:"filter", icon:<CheckCircleOutlined /> },
    { label: 'Artist', key:"artist", icon:<CheckCircleOutlined /> }
  ]

  const onClickHandler = () => {};
  
  return <Menu mode="horizontal" 
          className='navbar'
          items={items} 
          onClick={ onClickHandler }/>;
};

export default Navbar;