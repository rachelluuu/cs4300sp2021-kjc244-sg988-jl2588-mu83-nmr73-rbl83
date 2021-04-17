import InputGroup from './InputGroup';

function InputForm(props) {
  return (
    <div className="InputForm container mx-auto lg:px-10 lg:pt-20 relative top-5 ">
      <div className="mb-3 bg-gray-50 rounded-md shadow-lg">
        <form className="px-10 py-10">
          <div className="grid gap-4 grid-cols-2">
            <InputGroup label="Start Location" placeholder="New York" />
            <InputGroup label="End Location" placeholder="Ithaca" />
          </div>
          <div className="grid gap-4 grid-cols-2 mt-10">
            <InputGroup label="Vibe" placeholder="Groovy" />
            <InputGroup label="Keywords" placeholder="School, class..." />
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
