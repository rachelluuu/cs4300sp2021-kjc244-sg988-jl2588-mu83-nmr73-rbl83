function InputForm(props) {
  return (
    <div className="InputForm container mx-auto lg:px-10 lg:pt-20 relative top-5 ">
      <div className="mb-3 bg-gray-50 rounded-md shadow-lg">
        <form className="px-10 py-10">
          <div className="grid gap-4 grid-cols-2">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1 mb-2">
                Start Location
              </span>
              <input type="text" placeholder="New York" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
            </div>
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1 mb-2">
                End Location
              </span>
              <input type="text" placeholder="Ithaca" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-2 mt-10">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1 mb-2">
                Vibe
              </span>
              <input type="text" placeholder="Groovy" className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
            </div>
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1 mb-2">
                Keywords
              </span>
              <input type="text" placeholder="School, Class, ..." className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
            </div>
          </div>
          <button onClick={props.handleClick} className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-10" type="button">
            Fetch Results
          </button>
        </form>
      </div>

    </div>
  );
}

export default InputForm;
