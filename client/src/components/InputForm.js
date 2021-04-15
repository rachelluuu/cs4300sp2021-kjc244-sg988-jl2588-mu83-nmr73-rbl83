import { useState, useEffect } from 'react';

function InputForm() {
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
    <div className="InputForm container mx-auto px-10 pt-20">
      <div class="mb-3 pt-0">
        <form class="gap-4 pb-10">
          <div class="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 pb-10">
            <div>
              <h5 class="text-xl text-center font-semibold mt-2 mb-2 text-indigo-800">
                Start Location
              </h5>
            </div>
            <div class="col-span-2">
              <input type="text" placeholder="New York" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
            </div>
          </div>
          <div class="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1 pb-10">
            <div>
              <h5 class="text-xl text-center font-semibold mt-2 mb-2 text-indigo-800">
                End Location
              </h5>
            </div>
            <div class="col-span-2">
              <input type="text" placeholder="Ithaca" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
            </div>
          </div>
          <div class="grid lg:grid-cols-6 md:grid-cols-2 sm:grid-cols-1">
            <div>
              <h5 class="text-xl text-center font-semibold mt-2 mb-2 text-indigo-800">
                Options
              </h5>
            </div>
            <div class="col-span-2">
              <input type="text" placeholder="Genre" class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full" />
            </div>
          </div>
          <button class="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 ml-10 mt-10" type="button">
            Submit
          </button>
        </form>
        <p>random test stuff: {testJsonData}</p>
      </div>

    </div>
  );
}

export default InputForm;
