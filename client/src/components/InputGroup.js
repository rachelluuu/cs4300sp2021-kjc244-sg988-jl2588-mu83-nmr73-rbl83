function InputGroup(props) {
  function handleChange(e) {
    e.preventDefault();
    props.setVal(e.target.value);
  }

  function DisplayRequired() {
    if (props.required) {
      return <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1 mb-2">
        Required
    </span>
    } else {
      return null;
    }
  }

  function DisplayHeader() {
    if (props.header) {
      return <h3 className="text-2xl font-bold text-blueGray-600 pb-5 text-center">{props.header}</h3>
    } else {
      return <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1 mb-2">
        {props.label}
      </span>;
    }
  }


  return (
    <div>
      <DisplayHeader />
      <DisplayRequired />
      <input type="text" value={props.value} onChange={handleChange}
        placeholder={props.placeholder} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
    </div>

  );
}

export default InputGroup;
