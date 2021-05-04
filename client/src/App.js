import InputForm from './components/InputForm';
import Results from './components/Results';
import Footer from './components/Footer';
import { useState, useEffect } from 'react';
import cities from './components/cities.json';

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('Type in a query to get started');
  const [citiesList, setCitiesList] = useState(['Chicago', 'New York']);

  useEffect(() => {
    setCitiesList(cities.cities);
  }, []);

  return (
    <div className="App bg-blueGray-100">
      <div className="bg-hero-custom bg-center container mx-auto lg:px-40">
        <div className="bg-white px-8 py-6 w-max -mt-2 rounded-md shadow-lg">
          <h1 className="font-customStack text-4xl">
            🚦 traffic jams
          </h1>

          <h2 className="text-2xl text-blueGray-600 mt-5">Generate the perfect playlist for your roadtrip.</h2>
        </div>
        <InputForm
          setResults={setResults}
          setError={setError}
          cities={citiesList}
        />
      </div>
      <div className="-mt-5 lg:px-40 py-20">
        <Results
          error={error}
          results={results}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;