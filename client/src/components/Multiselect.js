import { useState, useEffect } from 'react';
import InputGroup from './InputGroup';

function Multiselect(props) {
  // a multiselect component used for selecting multiple genres
  const [options, setOptions] = useState(['Pop', 'Party', 'Disco']);
  const [curSearch, setCurSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setOptions(['Pop', 'Party', 'American']);
  }, []);

  function onSearchChange(val) {
    setCurSearch(val);
    const filteredOptions = options.filter(
      (option) => option.toLowerCase().indexOf(curSearch.toLowerCase()) > -1
    );
    setSearchResults(filteredOptions);
  }

  function onClickResult(val) {
    setCurSearch('');
    if (!props.genres.includes(val)) {
      props.setGenres([...props.genres, val]);
      setSearchResults([]);
    }
  }

  function onRemoveGenre(val) {
    const newGenres = props.genres.filter(
      (genre) => genre.toLowerCase() !== val.toLowerCase()
    );
    props.setGenres(newGenres);
  }

  const displaySearchResults = searchResults.map((result, index) =>
    <div className="cursor-pointer py-3 px-2" onClick={() => onClickResult(result)} key={index}>{result}</div>
  );

  const selectedGenres = props.genres.map((genre, index) =>
    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blueGray-500 uppercase last:mr-0 mr-1 mb-2" key={index}>
      {genre}
      <span className="cursor-pointer py-1 px-2" onClick={() => onRemoveGenre(genre)}> x</span>
    </span>
  );

  return (
    <div>
      <InputGroup label="Genres" placeholder="Pop" value={curSearch} setVal={onSearchChange} />
      <div className="bg-white text-blueGray-600 rounded text-sm shadow">
        {displaySearchResults}
      </div>
      <div className="mt-2">
        {selectedGenres}
      </div>
    </div>

  );
}

export default Multiselect;
