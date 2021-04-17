import InputForm from './components/InputForm';
import Results from './components/Results';
import { useState, useEffect } from 'react';

function App() {
  const [testJsonData, setTestJsonData] = useState('test0');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/testjson').then(res => res.json()).then(data => {
      // /testjson response format
      //{
      //  "name": "test1"
      //}
      setTestJsonData(data.name)
    });
  }, []);

  function handleClick(e) {
    e.preventDefault();
    setLoading(true);
  }


  return (
    <div className="App">
      <div className="bg-hero-custom bg-center container mx-auto lg:px-40">
        <div className="bg-white px-8 py-6 w-max -mt-2 rounded-md shadow-lg">
          <h1 className="font-customStack text-4xl">
            🚦 traffic jams
        </h1>
        </div>
        <InputForm handleClick={handleClick} />
      </div>
      <div className="bg-blueGray-100 -mt-5 lg:px-40 py-20">
        <Results loading={loading} />
      </div>
    </div>
  );
}

export default App;