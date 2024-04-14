import React, { useEffect, useState } from "react";
import axios from "axios";

const ASSIGNMENT_URL =
  "https://kanbas-node-server-cs4550.onrender.com/a5/assignment";
const MODULE_URL = "https://kanbas-node-server-cs4550.onrender.com/a5/module";

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [module, setModule] = useState({
    id: 2,
    name: "Node Server Module",
    description: "Learn how to build a backend with NodeJS",
    course: "CS4550",
  });

  const fetchAssignment = async () => {
    const response = await axios.get(`${ASSIGNMENT_URL}`);
    setAssignment(response.data);
  };
  const updateTitle = async () => {
    const response = await axios.get(
      `${ASSIGNMENT_URL}/title/${assignment.title}`
    );
    setAssignment(response.data);
  };
  useEffect(() => {
    fetchAssignment();
  }, []);

  return (
    <div>
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a
        href="https://kanbas-node-server-cs4550.onrender.com/a5/assignment"
        className="btn btn-primary me-2"
      >
        Get Assignment
      </a>
      <a
        href="https://kanbas-node-server-cs4550.onrender.com/a5/module"
        className="btn btn-primary"
      >
        Get Module
      </a>
      <h4>Retrieving Properties</h4>
      <a
        href="https://kanbas-node-server-cs4550.onrender.com/a5/assignment/title"
        className="btn btn-primary me-2"
      >
        Get Assignment Title
      </a>
      <a
        href="https://kanbas-node-server-cs4550.onrender.com/a5/module/name"
        className="btn btn-primary me-2"
      >
        Get Module Name
      </a>
      <h4>Modifying Properties</h4>
      <a
        href={`${ASSIGNMENT_URL}/title/${assignment.title}`}
        className="btn btn-primary me-2"
      >
        Update Assignment Title
      </a>
      <input
        type="text"
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
        value={assignment.title}
      />
      <br />
      <a
        href={`${ASSIGNMENT_URL}/score/${assignment.score}`}
        className="btn btn-primary me-2"
      >
        Update Assignment Score
      </a>
      <input
        type="number"
        onChange={(e) =>
          setAssignment({
            ...assignment,
            score: e.target.value as unknown as number,
          })
        }
        value={assignment.score}
      />
      <br />
      <a
        href={`${ASSIGNMENT_URL}/completed/${assignment.completed}`}
        className="btn btn-primary me-2"
      >
        Update Assignment Completed
      </a>
      <input
        type="checkbox"
        onChange={(e) =>
          setAssignment({
            ...assignment,
            completed: e.target.checked,
          })
        }
        value={assignment.completed.toString()}
      />
      <br />
      <a
        href={`${MODULE_URL}/name/${module.name}`}
        className="btn btn-primary me-2"
      >
        Update Module Name
      </a>
      <input
        type="text"
        onChange={(e) => setModule({ ...module, name: e.target.value })}
        value={module.name}
      />
      <br />
      <a
        href={`${MODULE_URL}/description/${module.description}`}
        className="btn btn-primary me-2"
      >
        Update Module Description
      </a>
      <input
        type="text"
        onChange={(e) => setModule({ ...module, description: e.target.value })}
        value={module.description}
      />
      <h3>Modifying Properties</h3>
      <button onClick={fetchAssignment} className="btn btn-primary">
        Fetch Assignment
      </button>
      <br />
      <input
        onChange={(e) =>
          setAssignment({
            ...assignment,
            title: e.target.value,
          })
        }
        value={assignment.title}
        type="text"
        className="me-2"
      />
      <button onClick={updateTitle} className="btn btn-primary">
        Update Title to: {assignment.title}
      </button>
    </div>
  );
}
