import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Menu, Input, Button } from "antd";
import { 
  PlayCircleOutlined, 
  FilterOutlined, 
  CheckCircleOutlined, 
  UserOutlined, 
  ShoppingCartOutlined,
  IdcardOutlined
} from '@ant-design/icons';

import { getContextType } from "../context/AppContext";

const Navbar = (props) => {
  const navigate = useNavigate();
  const handleChange = (e) => setSearchValue(e.target.value)
  const { 
    _searchValue:[searchValue, setSearchValue],
    _pickedMovie:[pickedMovie],
    _movieSearchResults:[movieSearchResults],
    _cart:[cart]
  } = getContextType('MoviesContext');

  const inputSearchProps = {
    style:{ marginTop:6 },
    placeholder:"Search a movie...",
    allowClear: true,
    onSearch: props.handleMovieSearch,
    onChange:handleChange,
    value:searchValue,
    enterButton:'Search',
  }

  const [items, setItems] = useState([
    { label: 'FlixBuster', key:"home", icon:<PlayCircleOutlined />},
    { label: 'Search Filter', key:"filter", icon:<FilterOutlined />, disabled:true },
    { label: 'Last Picked', key:"movie", icon:<CheckCircleOutlined />, disabled:true },
    { label: <Input.Search {...inputSearchProps} />, key:"search", disabled:true },
    { label: 'Artist', key:"artist", icon:<IdcardOutlined />, disabled:true },
    { label: 'Cart', key:"cart", icon:<ShoppingCartOutlined />, disabled:true },
    { label: 'Sign In / Up', key:"sign", icon:<UserOutlined /> },
  ])
  
  useEffect(()=>{
    const [homeItem, filterItem, movieItem, searchItem, artistItem, cartItem, signItem] = items;
    setItems([
      homeItem, 
      { label: 'Search Filter', key:"filter", icon:<CheckCircleOutlined />, disabled: movieSearchResults===undefined ? true : false },
      { label: 'Last Picked', key:"movie", icon:<CheckCircleOutlined />, disabled: pickedMovie===undefined ? true : false },
      { label: <Input.Search {...inputSearchProps} />, key:"search", disabled:true },
      { label: 'Artist', key:"artist", icon:<IdcardOutlined />, disabled:true },
      { label: 'Cart', key:"cart", icon:<ShoppingCartOutlined />, disabled: cart.length > 0 ? false : true },
      signItem
    ])
  }, 
  [
    pickedMovie, 
    movieSearchResults, 
    cart, 
    searchValue
  ])
  

  const onClickHandler = (params) => {
    if (params.key.trim() == 'movie') navigate("/" + params.key.trim() + '/' + pickedMovie.id, { replace: true });
    else if (params.key.trim() == 'sign') navigate("/signin", { replace: true });
    else navigate("/"+params.key.trim(), { replace: true });
  }
  
  return <Menu mode="horizontal"
          selectedKeys={[props.selectedPath]} 
          items={items} 
          style={{ display:'flex', justifyContent:'flex-start' }}
          onClick={ onClickHandler }/>
};

export default Navbar;