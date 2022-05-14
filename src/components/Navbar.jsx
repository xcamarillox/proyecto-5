import { useState } from "react";
import { useNavigate  } from 'react-router-dom';
import { Menu, Input } from "antd";
import { PlayCircleOutlined, FilterOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';

import { getContextType } from "../context/AppContext";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { _pickedMovie:[pickedMovie, setPickedMovie] } = getContextType('MoviesContext');

  const items = [
    { label: 'FlixBuster', key:"home", icon:<PlayCircleOutlined />},
    { label: 'Last Search', key:"filter", icon:<FilterOutlined /> },
    { label: 'Last Picked', key:"movie", icon:<CheckCircleOutlined /> },
    { label: <Input.Search style={{marginTop:6}} onSearch={props.handleMovieSearch}/>, key:"searchInput", disabled:true },
    { label: 'Sign In/Sign Up', key:"sign", icon:<UserOutlined /> },
  ]

  const onClickHandler = (params) => {
    if (params.key.trim() != 'movie') navigate("/"+params.key.trim(), { replace: true });
    else navigate("/" + params.key.trim() + '/' + pickedMovie.id, { replace: true });
  }
  
  return <Menu mode="horizontal"
          selectedKeys={[props.selectedPath]} 
          items={items} 
          onClick={ onClickHandler }/>
};

export default Navbar;