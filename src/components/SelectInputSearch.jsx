import { useNavigate  } from 'react-router-dom';
import { Input, Select, Button, message } from "antd";

import { ACTIONS_LIST, getAPIdata } from '../scripts/api-helpers';
import { getContextType } from "../context/AppContext";

const SelectInputSearch = (props) => {
    const navigate = useNavigate();
    const { 
        _searchResults:[searchResults, setSearchResults],
        _searchSetup:[searchSetup, setSearchSetup],
    } = getContextType('MoviesContext');

    const handleChangeOnInput = (e) => setSearchSetup({...searchSetup, value:e.target.value})
    const handleChangeOnSelect = (value) => setSearchSetup({...searchSetup, type: value})
    const handleSearch = async (searchedText) => {
      if (searchedText.trim().length != 0){
          try{
              let response;
              if (searchSetup.type == 'movie'){
                  response = await getAPIdata({
                      type: ACTIONS_LIST.SEARCH_FOR_MOVIES,
                      searchedMovie: searchedText.trim()
                  })
              }else{
                  response = await getAPIdata({
                      type: ACTIONS_LIST.SEARCH_FOR_ARTIST,
                      searchedArtist: searchedText.trim()
                  })
                  //console.log('App',response.results)
              }
              if (!(response && response.success!==false)) throw new Error('Server Error');
              if (response.results.length == 0) {
                  setSearchResults()
                  message.error(`No se tuvieron resultados con ${searchedText.trim()}`);
                  return;
              }
              setSearchResults({type:searchSetup.type, results:response.results});
              navigate("/filter", { replace: true });
              //console.log(response.results);
          }catch(error){
              message.error(error.message);
          }
      }
    }

    const selectBefore = (
      <Select 
        value={searchSetup.type} 
        style={props.isJumbotronItem ? {backgroundColor:'#F7EC40', color:'#2E3696'}: {}} 
        onChange={ handleChangeOnSelect }
      >
        <Select.Option value="movie">Movie</Select.Option>
        <Select.Option value="artist">Artist</Select.Option>
      </Select>
    );

    const inputSearchProps = {
        style:{ marginTop:6 },
        addonBefore: selectBefore,
        placeholder:`Search ${ searchSetup.type == 'movie'? 'a movie...':'an artist...' }`,
        allowClear: true,
        onSearch: handleSearch,
        onChange:handleChangeOnInput,
        value:searchSetup.value,
        enterButton:props.isJumbotronItem ? 
            <Button style={{backgroundColor:'#F7EC40', color:'#2E3696'}}>Search</Button>:
            'Search',
    }

    return <Input.Search {...inputSearchProps} />
}

export default SelectInputSearch;