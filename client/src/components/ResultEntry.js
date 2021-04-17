function ResultEntry(props) {
  const title = props.songProps[0];
  const artist = props.songProps[1];
  //const score = props.songProps[2];
  return (
    <div className="mb-3 bg-white rounded-md shadow lg:px-5 lg:py-5 lg:w-2/3 mx-auto flex lg:gap-10">
      <div className="test">
        <div className="items-center h-14 w-14 justify-center">
          <p className="text-center leading-10 mt-1 text-blueGray-400 text-xl font-light">{props.index + 1}</p>
        </div>
      </div>
      <div className="test2">
        <h4 className="font-sans font-semibold text-2xl">{title}</h4>
        <h5 className="font-sans text-xl">{artist}</h5>
      </div>
    </div>
  );
}

export default ResultEntry;
