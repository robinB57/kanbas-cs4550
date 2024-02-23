import { Link, Route, Routes } from "react-router-dom";
import Assignment3 from "./a3";
import Nav from "../Nav";

export default function Labs() {
  return (
    <div className="container-fluid">
      <Nav />
      <Link to="/Labs/a3">Assignment 3</Link> |
      <Link to="/Labs/a4">Assignment 4</Link>
      <Routes>
        <Route path="/a3/*" element={<Assignment3 />} />
        {/* <Route path="/a4/*" element={<Assignment4 />} /> */}
      </Routes>
    </div>
  );
}
