import React, { useEffect, useState } from "react";
import axios from "axios";
import { LAB_5_API } from "../../constants";
export default function EncodingParametersInURLs() {
  const [a, setA] = useState(34);
  const [b, setB] = useState(23);
  const [welcome, setWelcome] = useState("");
  const fetchWelcome = async () => {
    const response = await axios.get(`${LAB_5_API}/welcome`);
    setWelcome(response.data);
  };
  useEffect(() => {
    fetchWelcome();
  }, []);
  const [result, setResult] = useState(0);
  const fetchAdd = async (a: number, b: number) => {
    const response = await axios.get(`${LAB_5_API}/add/${a}/${b}`);
    setResult(response.data);
  };
  const fetchSubtract = async (a: number, b: number) => {
    const response = await axios.get(`${LAB_5_API}/subtract/${a}/${b}`);
    setResult(response.data);
  };

  return (
    <div>
      <h3>Encoding Parameters In URLs</h3>
      <h4>Calculator</h4>
      <input
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value as unknown as number)}
      />
      <input
        type="number"
        onChange={(e) => setB(e.target.value as unknown as number)}
        value={b}
      />
      <h3>Path Parameters</h3>
      <a href={`${LAB_5_API}/add/${a}/${b}`} className="btn btn-primary me-2">
        Add {a} + {b}
      </a>
      <a
        href={`${LAB_5_API}/subtract/${a}/${b}`}
        className="btn btn-danger me-2"
      >
        Subtract {a} - {b}
      </a>
      <a
        href={`${LAB_5_API}/multiply/${a}/${b}`}
        className="btn btn-success me-2"
      >
        Multiply {a} * {b}
      </a>
      <a
        href={`${LAB_5_API}/divide/${a}/${b}`}
        className="btn btn-warning me-2"
      >
        Divide {a} / {b}
      </a>{" "}
      <h3>Query Parameters</h3>
      <a
        className="btn btn-primary me-2"
        href={`${LAB_5_API}/calculator?operation=add&a=${a}&b=${b}`}
      >
        Add {a} + {b}
      </a>
      <a
        className="btn btn-danger me-2"
        href={`${LAB_5_API}/calculator?operation=subtract&a=${a}&b=${b}`}
      >
        Subtract {a} - {b}
      </a>
      <a
        className="btn btn-success me-2"
        href={`${LAB_5_API}/calculator?operation=multiply&a=${a}&b=${b}`}
      >
        Multiply {a} * {b}
      </a>
      <a
        className="btn btn-warning me-2"
        href={`${LAB_5_API}/calculator?operation=divide&a=${a}&b=${b}`}
      >
        Divide {a} / {b}
      </a>
      <h4>Integrating React with APIs</h4>
      <h5>Fetching Welcome</h5>
      <h6>{welcome}</h6>
      <input value={result} type="number" readOnly />
      <h3>Fetch Result</h3>
      <button onClick={() => fetchAdd(a, b)} className="btn btn-primary me-2">
        Fetch Addition of {a} + {b}
      </button>
      <button onClick={() => fetchSubtract(a, b)} className="btn btn-primary">
        Fetch Subtraction of {a} - {b}
      </button>
    </div>
  );
}
