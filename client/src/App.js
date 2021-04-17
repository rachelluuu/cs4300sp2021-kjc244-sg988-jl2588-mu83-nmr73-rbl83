import InputForm from './components/InputForm';
import Results from './components/Results';
import { useState } from 'react';

function App() {
  const [results, setResults] = useState([['Song Name', 'artist', 0], ['Song2', 'artist2', 1]]);
  const [error, setError] = useState('');

  return (
    <div className="App">
      <div className="bg-hero-custom bg-center container mx-auto lg:px-40">
        <div className="bg-white px-8 py-6 w-max -mt-2 rounded-md shadow-lg">
          <h1 className="font-customStack text-4xl">
            🚦 traffic jams
        </h1>
        </div>
        <InputForm
          setResults={setResults}
          setError={setError}
        />
      </div>
      <div className="bg-blueGray-100 -mt-5 lg:px-40 py-20">
        <Results
          error={error}
          results={results}
        />
      </div>
    </div>
  );
}

export default App;