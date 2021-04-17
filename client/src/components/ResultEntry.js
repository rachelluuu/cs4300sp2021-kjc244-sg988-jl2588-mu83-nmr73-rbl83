function ResultEntry(props) {
  const title = props.songProps[0];
  const artist = props.songProps[1];
  const score = props.songProps[2];
  return (
    <div>
      <h2>{title}</h2>
      <h3>{artist}</h3>
      <h5>{score}</h5>
    </div>
  );
}

export default ResultEntry;
