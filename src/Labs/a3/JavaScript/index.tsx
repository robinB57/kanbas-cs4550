import Arrays from "./arrays";
import Conditionals from "./conditionals";
import Functions from "./functions";
import FunctionDestructing from "./functions/FunctionDestructing";
import Json from "./json";
import String from "./string";
import Variables from "./variables";

// I packaged each of the lab exercises into sub-components based on
// what folders they were in, so that this component didn't become bloated.

// FunctionDestructing is at the end because if it went in Functions,
// the exercises would be out of order

export default function JavaScript() {
  console.log("Hello World!");
  return (
    <div>
      <h1>JavaScript</h1>
      <Variables />
      <Conditionals />
      <Functions />
      <Arrays />
      <String />
      <Json />
      <FunctionDestructing />
    </div>
  );
}
