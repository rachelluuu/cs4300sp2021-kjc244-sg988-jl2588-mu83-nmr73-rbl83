import { useState, useEffect } from 'react';
import InputGroup from './InputGroup';
import SearchDropdownResults from './SearchDropdownResults';

function InputCity(props) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (props.value.length > 0) {
      const filteredOptions = props.options.filter(
        (option) => option.toLowerCase().indexOf(props.value.toLowerCase()) > -1
      );
      if (filteredOptions.length > 0 && filteredOptions[0] !== props.value) {
        setSearchResults(filteredOptions);
      }
    }
  }, [props.value, props.options]);

  function onClickResult(val) {
    props.setVal(val);
    setSearchResults([]);
  }

  return (
    <div>
      <InputGroup label={props.label} placeholder={props.placeholder} value={props.value} setVal={props.setVal} required={true} />
      <SearchDropdownResults searchResults={searchResults} onClickResult={onClickResult} />
    </div>

  );
}

export default InputCity;
