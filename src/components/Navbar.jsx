import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { Menu, Input } from "antd";
import { PlayCircleOutlined, FilterOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';

import { getContextType } from "../context/AppContext";

const Navbar = (props) => {
  const navigate = useNavigate();
  const { _pickedMovie:[pickedMovie] } = getContextType('MoviesContext');
  const [items, setItems] = useState([
    { label: 'FlixBuster', key:"home", icon:<PlayCircleOutlined />},
    { label: 'Last Search', key:"filter", icon:<FilterOutlined /> },
    { label: 'Last Picked', key:"movie", icon:<CheckCircleOutlined /> },
    { label: <Input.Search style={{marginTop:6}} onSearch={props.handleMovieSearch}/>, key:"searchInput", disabled:true },
    { label: 'Sign In / Up', key:"sign", icon:<UserOutlined /> },
  ])

  /*
  useEffect(()=>{
    const [home, filter, artist] = items;
    setItems([
      home, 
      { label: 'Filter', key:"filter", icon:<FilterOutlined />, disabled: props.artistArr ? false : true }, 
      { label: 'Artist', key:"artist", icon:<CheckCircleOutlined />, disabled: props.moviesArr ? false : true }
    ])
  }, [props.artistArr, props.moviesArr])
  */

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