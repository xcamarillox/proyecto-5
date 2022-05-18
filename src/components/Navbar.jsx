import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Menu, Input } from "antd";
import { PlayCircleOutlined, FilterOutlined, CheckCircleOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import { getContextType } from "../context/AppContext";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { 
    _pickedMovie:[pickedMovie],
    _movieSearchResults:[movieSearchResults],
    _cart:[cart]
  } = getContextType('MoviesContext');
  const [items, setItems] = useState([
    { label: 'FlixBuster', key:"home", icon:<PlayCircleOutlined />},
    { label: 'Last Search', key:"filter", icon:<FilterOutlined />, disabled:true },
    { label: 'Last Picked', key:"movie", icon:<CheckCircleOutlined />, disabled:true },
    { label: <Input.Search style={{marginTop:6}} onSearch={props.handleMovieSearch}/>, key:"search", disabled:true },
    { label: 'Cart', key:"cart", icon:<ShoppingCartOutlined />, disabled:true },
    { label: 'Sign In / Up', key:"sign", icon:<UserOutlined /> },
  ])

  
  useEffect(()=>{
    const [homeItem, filterItem, movieItem, searchItem, cartItem, signItem] = items;
    setItems([
      homeItem, 
      { label: 'Last Search', key:"filter", icon:<CheckCircleOutlined />, disabled: movieSearchResults===undefined ? true : false },
      { label: 'Last Picked', key:"movie", icon:<CheckCircleOutlined />, disabled: pickedMovie===undefined ? true : false },
      searchItem,
      { label: 'Cart', key:"cart", icon:<ShoppingCartOutlined />, disabled: cart.length==0 ? true : false },
      signItem
    ])
  }, [pickedMovie, movieSearchResults, cart])
  

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