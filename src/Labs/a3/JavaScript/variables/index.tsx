import BooleanVariables from "./BooleanVariables";
import VariableTypes from "./VariableTypes";
import VariablesAndConstants from "./VariablesAndConstants";

export default function Variables() {
  return (
    <>
      <VariablesAndConstants />
      <VariableTypes />
      <BooleanVariables />
    </>
  );
}
