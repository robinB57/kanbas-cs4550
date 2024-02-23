import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Kanbas from "./Kanbas";
import Labs from "./Labs";
import HelloWorld from "./Labs/a3/HelloWorld";

function App() {
  return (
    <>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/Labs" />} />
            <Route path="/Labs/*" element={<Labs />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
            <Route path="/hello" element={<HelloWorld />} />
          </Routes>
          <br />
        </div>
      </HashRouter>
    </>
  );
}

export default App;
