import InputForm from './components/InputForm';
import { useState, useEffect } from 'react';

function App() {
  const [testJsonData, setTestJsonData] = useState('test0');

  useEffect(() => {
    fetch('/testjson').then(res => res.json()).then(data => {
      // /testjson response format
      //{
      //  "name": "test1"
      //}
      setTestJsonData(data.name)
    });
  }, []);

  return (
    <div className="App">
      <div class="bg-hero-custom bg-center container mx-auto lg:px-40 pt-10">
        <div class="bg-white px-8 py-6 w-max -mt-12 rounded-md shadow-lg">
          <h1 class="font-customStack text-4xl">
            🚦 traffic jams
        </h1>
        </div>
        <InputForm />
      </div>
      <div className="bg-blueGray-100 pt-20">
        ..sdfsdfsdfsdfsdfsdf
      </div>
    </div>
  );
}

export default App;