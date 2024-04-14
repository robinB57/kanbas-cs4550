import { LAB_5_API } from "../../constants";
import EncodingParametersInURLs from "./EncodingParametersInURLs";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithObjects from "./WorkingWithObjects";

export default function Assignment5() {
  return (
    <div>
      <h1>Assignment 5</h1>
      <a href={`${LAB_5_API}/a5/welcome`} className="btn btn-primary">
        Welcome
      </a>
      <EncodingParametersInURLs />
      <WorkingWithObjects />
      <WorkingWithArrays />
    </div>
  );
}
