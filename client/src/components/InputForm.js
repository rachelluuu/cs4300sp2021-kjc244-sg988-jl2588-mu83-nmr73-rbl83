import InputGroup from './InputGroup';
import InputCity from './InputCity';
import Multiselect from './Multiselect';
import { useState } from 'react';

function InputForm(props) {
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [genres, setGenres] = useState([]);
  const [keywords, setKeywords] = useState('');

  function handleClick(e) {
    e.preventDefault();
    if (props.cities.includes(origin) && props.cities.includes(destination)) {
      setLoading(true);
      fetch('/search?' + new URLSearchParams({
        'origin': origin,
        'destination': destination,
        'genres': genres,
        'keywords': keywords
      })).then(res => res.json()).then(data => {
        console.log(data);
        props.setError(data.error);
        props.setResults(data.playlist);
        setLoading(false);
      }).catch((error) => {
        console.log(error);
        props.setError("Error: Check your network connection or inputs.");
        setLoading(false);
      });
    } else {
      props.setError("Error: Make sure you clicked on cities in the dropdown.");
    }
  }

  function SubmitButton() {
    let SubmitButton;
    if (loading) {
      SubmitButton = <button className="opacity-50 cursor-not-allowed bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-10" type="button">
        Loading...
    </button>
    } else {
      SubmitButton = <button onClick={handleClick} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-10" type="button">
        Generate Playlist
    </button>
    }
    return SubmitButton;
  }

  return (
    <div className="InputForm container mx-auto lg:px-10 lg:pt-20 relative top-5 ">
      <div className="mb-3 bg-gray-50 rounded-md shadow-lg">
        <form className="px-10 py-10">
          <div className="grid gap-4 grid-cols-">
            <InputGroup label="Input" placeholder="School, class, books, study..." value={keywords} setVal={setKeywords} header={"Input any words to shape the theme of your playlist."} />
          </div>
          <p className="text-blueGray-500 pb-5 mt-5">Where are you going? Please make sure you click on cities and genres from the dropdowns with your mouse.</p>
          <div className="grid gap-4 grid-cols-2">
            <InputCity options={props.cities} label="Origin" placeholder="New York" value={origin} setVal={setOrigin} />
            <InputCity options={props.cities} label="Destination" placeholder="Chicago" value={destination} setVal={setDestination} />
          </div>
          <div className="grid gap-4 grid-cols-1 mt-5">
            <Multiselect genres={genres} setGenres={setGenres} />
          </div>
          <SubmitButton />
        </form>
      </div>

    </div>
  );
}

export default InputForm;
