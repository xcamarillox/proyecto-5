import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Menu } from "antd";
import { 
  PlayCircleOutlined, 
  FilterOutlined, 
  PaperClipOutlined, 
  UserOutlined, 
  ShoppingCartOutlined,
  IdcardOutlined
} from '@ant-design/icons';

import { getContextType } from "../context/AppContext";
import SelectInputSearch from "./SelectInputSearch";

const Navbar = (props) => {
  const [items, setItems] = useState([])
  const navigate = useNavigate();
  const { 
    _searchSetup:[searchSetup],
    _pickedArtist:[pickedArtist],
    _pickedMovie:[pickedMovie],
    _searchResults:[searchResults],
    _cart:[cart]
  } = getContextType('MoviesContext');

  useEffect(()=>{
    setItems([
      { label: 'FlixBuster', key:"home"}, 
      { label: 'Search Filter', key:"filter", icon:<FilterOutlined />, disabled: searchResults===undefined ? true : false },
      { label: 'Last Picked', key:"lastPicked", icon:<PaperClipOutlined />, disabled: pickedMovie === undefined && pickedArtist === undefined ? true : false, 
        children: [
          { label: 'Movie', key:"movie", icon:<PlayCircleOutlined />, disabled: pickedMovie===undefined ? true : false },
          { label: 'Artist', key:"artist", icon:<IdcardOutlined />, disabled: pickedArtist === undefined? true : false },
        ]
      },
      { label: <SelectInputSearch />, key:"search", disabled:true },
      { label: 'Cart', key:"cart", icon:<ShoppingCartOutlined />, disabled: cart.length > 0 ? false : true },
      { label: 'My Profile', key:"profile", icon:<UserOutlined /> },
      { label: 'Sign In / Up', key:"sign", icon:<UserOutlined /> }
    ])
  }, [searchSetup, pickedMovie, pickedArtist, searchResults, cart])
  

  const onClickHandler = (params) => {
    if (params.key.trim() == 'movie') navigate("/" + params.key.trim() + '/' + pickedMovie.id, { replace: true });
    else if (params.key.trim() == 'artist') navigate("/" + params.key.trim() + '/' + pickedArtist.id, { replace: true });
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