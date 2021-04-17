import InputGroup from './InputGroup';
import { useState } from 'react';

function InputForm(props) {
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [vibe, setVibe] = useState('');
  const [keywords, setKeywords] = useState('');

  function handleClick(e) {
    e.preventDefault();
    setLoading(true);
    fetch('http://localhost:5000/search', {
      'origin': origin,
      'destination': destination,
      'vibe': vibe,
      'keywords': keywords
    }).then(res => console.log(res));
    /*.then(res => res.json()).then(data => {
      console.log(data)
      props.setError(data.error)
      props.setResults(data.playlist)
      setLoading(false)
    });*/
  }

  return (
    <div className="InputForm container mx-auto lg:px-10 lg:pt-20 relative top-5 ">
      <div className="mb-3 bg-gray-50 rounded-md shadow-lg">
        <form className="px-10 py-10">
          <div className="grid gap-4 grid-cols-2">
            <InputGroup label="Origin" placeholder="New York" value={origin} setVal={setOrigin} />
            <InputGroup label="Destination" placeholder="Ithaca" value={destination} setVal={setDestination} />
          </div>
          <div className="grid gap-4 grid-cols-2 mt-10">
            <InputGroup label="Vibe" placeholder="Groovy" value={vibe} setVal={setVibe} />
            <InputGroup label="Keywords" placeholder="School, class..." value={keywords} setVal={setKeywords} />
          </div>
          <button onClick={handleClick} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-10" type="button">
            {loading ? 'Loading...' : 'Fetch Results'}
          </button>
        </form>
      </div>

    </div>
  );
}

export default InputForm;
