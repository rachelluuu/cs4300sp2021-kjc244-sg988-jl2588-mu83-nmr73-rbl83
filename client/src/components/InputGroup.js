function InputGroup(props) {
  function handleChange(e) {
    e.preventDefault();
    props.setVal(e.target.value);
  }

  return (
    <div>
      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-blueGray-600 bg-blueGray-200 uppercase last:mr-0 mr-1 mb-2">
        {props.label}
      </span>
      <input type="text" value={props.value} onChange={handleChange}
        placeholder={props.placeholder} className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" />
    </div>

  );
}

export default InputGroup;
