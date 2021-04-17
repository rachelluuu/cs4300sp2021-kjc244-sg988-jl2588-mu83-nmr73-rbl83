import ResultEntry from './ResultEntry';

function Results(props) {
  const playlist = props.results.map((result, index) =>
    <ResultEntry songProps={result} index={index} key={index} />
  );

  function RenderErrorOrSuccess() {
    if (props.error) {
      return <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded text-red-600 bg-red-200 uppercase last:mr-0 mr-1">
        {props.error}
      </span>
    }
    else {
      return <h2 className="font-customStack text-4xl pb-3 text-center lg:pt-12 lg:pb-12">🎶 your playlist</h2>
    }
  }

  return (
    <div className="mb-3 bg-white rounded-md shadow-lg lg:px-5 lg:py-5 lg:w-2/3 mx-auto">
      <RenderErrorOrSuccess />
      <div>
        {playlist}
      </div>
    </div>
  );
}

export default Results;
