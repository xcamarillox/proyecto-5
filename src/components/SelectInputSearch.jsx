import { Input, Select, Button } from "antd";

import { getContextType } from "../context/AppContext";

const SelectInputSearch = (props) => {
    const { 
        _searchSetup:[searchSetup, setSearchSetup],
    } = getContextType('MoviesContext');

    const handleChangeOnInput = (e) => setSearchSetup({...searchSetup, value:e.target.value})
    const handleChangeOnSelect = (value) => setSearchSetup({...searchSetup, type: value})

    const selectBefore = (
      <Select value={searchSetup.type} className="select-before" onChange={ handleChangeOnSelect }>
        <Select.Option value="movie">Movie</Select.Option>
        <Select.Option value="artist">Artist</Select.Option>
      </Select>
    );

    const inputSearchProps = {
        style:{ marginTop:6 },
        addonBefore: selectBefore,
        placeholder:`Search ${ searchSetup.type == 'movie'? 'a movie...':'an artist...' }`,
        allowClear: true,
        onSearch: props.handleSearch,
        onChange:handleChangeOnInput,
        value:searchSetup.value,
        enterButton:props.isJumbotronItem ? 
            <Button style={{backgroundColor:'#F7EC40', color:'#2E3696'}}>Search</Button>:
            'Search',
    }

    return <Input.Search {...inputSearchProps} />
}

export default SelectInputSearch;