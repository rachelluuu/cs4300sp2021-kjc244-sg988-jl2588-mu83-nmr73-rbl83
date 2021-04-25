function SearchDropdownResults(props) {
  const displaySearchResults = props.searchResults.map((result, index) =>
    <div className="cursor-pointer py-3 px-2 shadow-sm" onClick={() => props.onClickResult(result)} key={index}>{result}</div>
  );

  function EmptyOrResults() {
    if (props.searchResults.length > 0) {
      return <div className="bg-white text-blueGray-600 rounded text-sm shadow h-36 overflow-auto">
        {displaySearchResults}
      </div>
    } else {
      return null;
    }
  }

  return (
    <div>
      <EmptyOrResults />
    </div>
  );
}

export default SearchDropdownResults;
