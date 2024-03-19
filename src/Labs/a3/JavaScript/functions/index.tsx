import ArrowFunctions from "./ArrowFunctions";
import ES5Functions from "./ES5Functions";
import FunctionParenthesisAndParameters from "./FunctionParethesisAndParameters";
import ImpliedReturn from "./ImpliedReturn";

export default function Functions() {
  return (
    <>
      <ES5Functions />
      <ArrowFunctions />
      <ImpliedReturn />
      <FunctionParenthesisAndParameters />
    </>
  );
}
