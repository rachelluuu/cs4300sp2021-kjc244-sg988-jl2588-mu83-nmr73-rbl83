import ResultEntry from './ResultEntry';

function Results(props) {
  const resList = props.results.map((result) => <ResultEntry songProps={result} key={result[0]} />);
  return (
    <div>
      <h2>Results</h2>
      <div>
        {resList}
      </div>
    </div>
  );
}

export default Results;
