import { useState, useEffect } from 'react';
import InputGroup from './InputGroup';
import SearchDropdownResults from './SearchDropdownResults';
import genres from './genres.json';

function Multiselect(props) {
  // a multiselect component used for selecting multiple genres
  const [options, setOptions] = useState(['Pop', 'Party', 'Disco']);
  const [curSearch, setCurSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setOptions(genres.genres);
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
    }
    setSearchResults([]);
  }

  function onRemoveGenre(val) {
    const newGenres = props.genres.filter(
      (genre) => genre.toLowerCase() !== val.toLowerCase()
    );
    props.setGenres(newGenres);
  }

  const selectedGenres = props.genres.map((genre, index) =>
    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-white bg-blueGray-500 uppercase last:mr-0 mr-1 mb-2" key={index}>
      {genre}
      <span className="cursor-pointer py-1 px-2" onClick={() => onRemoveGenre(genre)}> x</span>
    </span>
  );

  return (
    <div>
      <InputGroup label="Genres" placeholder="Dance" value={curSearch} setVal={onSearchChange} required={true} />
      <SearchDropdownResults searchResults={searchResults} onClickResult={onClickResult} />
      <div className="mt-2">
        {selectedGenres}
      </div>
    </div>

  );
}

export default Multiselect;
