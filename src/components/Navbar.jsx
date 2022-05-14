import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Menu, Input } from "antd";
import { PlayCircleOutlined, FilterOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';

import { getContextType } from "../context/AppContext";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { 
    _pickedMovie:[pickedMovie],
    _movieSearchResults:[movieSearchResults],
  } = getContextType('MoviesContext');
  const [items, setItems] = useState([
    { label: 'FlixBuster', key:"home", icon:<PlayCircleOutlined />},
    { label: 'Last Search', key:"filter", icon:<FilterOutlined />, disabled:true },
    { label: 'Last Picked', key:"movie", icon:<CheckCircleOutlined />, disabled:true },
    { label: <Input.Search style={{marginTop:6}} onSearch={props.handleMovieSearch}/>, key:"searchInput", disabled:true },
    { label: 'Sign In / Up', key:"sign", icon:<UserOutlined /> },
  ])

  
  useEffect(()=>{
    const [home, filter, movie, searchInput, sign] = items;
    setItems([
      home, 
      { label: 'Last Search', key:"filter", icon:<CheckCircleOutlined />, disabled: movieSearchResults===undefined ? true : false },
      { label: 'Last Picked', key:"movie", icon:<CheckCircleOutlined />, disabled: pickedMovie===undefined ? true : false },
      searchInput,
      sign
    ])
  }, [pickedMovie, movieSearchResults])
  

  const onClickHandler = (params) => {
    if (params.key.trim() == 'movie') navigate("/" + params.key.trim() + '/' + pickedMovie.id, { replace: true });
    else if (params.key.trim() == 'sign') navigate("/signin", { replace: true });
    else navigate("/"+params.key.trim(), { replace: true });
  }
  
  return <Menu mode="horizontal"
          selectedKeys={[props.selectedPath]} 
          items={items} 
          onClick={ onClickHandler }/>
};

export default Navbar;