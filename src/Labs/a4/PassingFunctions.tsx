export default function PassingFunctions({
  theFunction,
}: {
  theFunction: () => void;
}) {
  return (
    <div>
      <h2>Passing Functions</h2>
      <button className="btn btn-primary" onClick={theFunction}>
        Invoke the Function
      </button>
    </div>
  );
}
