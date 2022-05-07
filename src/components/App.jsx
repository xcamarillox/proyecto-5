import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Input } from 'antd';

import Navbar from "./Navbar";
import MoviesList from "./MoviesList";

const App =  () => {
    let [moviesArr, setMoviesArr] = useState([
    {
        "adult": false,
        "backdrop_path": "/nNmJRkg8wWnRmzQDe2FwKbPIsJV.jpg",
        "genre_ids": [
          878,
          28,
          12
        ],
        "id": 24428,
        "original_language": "en",
        "original_title": "The Avengers",
        "overview": "When an unexpected enemy emerges and threatens global safety and security, Nick Fury, director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins!",
        "popularity": 242.869,
        "poster_path": "/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg",
        "release_date": "2012-04-25",
        "title": "The Avengers",
        "video": false,
        "vote_average": 7.7,
        "vote_count": 26838
      },
      {
        "adult": false,
        "backdrop_path": "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
        "genre_ids": [
          12,
          878,
          28
        ],
        "id": 299534,
        "original_language": "en",
        "original_title": "Avengers: Endgame",
        "overview": "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
        "popularity": 238.218,
        "poster_path": "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        "release_date": "2019-04-24",
        "title": "Avengers: Endgame",
        "video": false,
        "vote_average": 8.3,
        "vote_count": 20939
      },  
    ]);

    const [inputValue, setInputValue] = useState('')
    const handleChange = (e) => setInputValue(e.target.value)
    const inputSearchProps = {
        placeholder:"Buscar por nómbre acá...",
        allowClear: true,
        enterButton:"Buscar",
        size:"large",
        onChange:handleChange,
        value: inputValue
    }

    return (
        <Routes>
            <Route path="home" element={
                <>
                    <Navbar />
                    <h1>FlixBuster</h1>
                    <Input.Search {...inputSearchProps}/>
                    { moviesArr && <MoviesList moviesArr={moviesArr} /> }
                </>
            }/>
            <Route path="*" element={<Navigate to='home'/>} />
        </Routes>
    );
}

export default App;
