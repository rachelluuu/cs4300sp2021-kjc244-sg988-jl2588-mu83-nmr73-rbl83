import { useState, useEffect } from 'react';
import InputGroup from './InputGroup';
import SearchDropdownResults from './SearchDropdownResults';
import cities from './cities.json';

function InputCity(props) {
  const [options, setOptions] = useState(['Chicago', 'New York']);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    setOptions(cities.cities);
  }, []);

  useEffect(() => {
    if (props.value.length > 0) {
      const filteredOptions = options.filter(
        (option) => option.toLowerCase().indexOf(props.value.toLowerCase()) > -1
      );
      if (filteredOptions.length > 0 && filteredOptions[0] !== props.value) {
        setSearchResults(filteredOptions);
      }
    }
  }, [props.value, options]);

  function onClickResult(val) {
    props.setVal(val);
    setSearchResults([]);
  }

  return (
    <div>
      <InputGroup label={props.label} placeholder={props.placeholder} value={props.value} setVal={props.setVal} />
      <SearchDropdownResults searchResults={searchResults} onClickResult={onClickResult} />
    </div>

  );
}

export default InputCity;
