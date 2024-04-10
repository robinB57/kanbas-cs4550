import React, { useState } from "react";
import "./module-list.css";
import { FaEllipsisV, FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { addModule, deleteModule, setModule, updateModule } from "./reducer";
export default function ModuleList() {
  const { courseId } = useParams();

  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dispatch = useDispatch();
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);

  return (
    <>
      <div className="flex-fill">
        <button>Collapse All</button>
        <button>View Progress</button>
        <select>
          <option>Publish All</option>
          <option>Publish All Modules and Items</option>
          <option>Publish Modules Only</option>
          <option>Unpublish All Modules</option>
        </select>
        <button>+ Module</button>
        <ul className="list-group wd-modules">
          <li className="list-group-item">
            <input
              value={module.name}
              onChange={(e) =>
                dispatch(setModule({ ...module, name: e.target.value }))
              }
              style={{ marginBottom: "5px" }}
            />
            <br />
            <textarea
              value={module.description}
              onChange={(e) =>
                dispatch(setModule({ ...module, description: e.target.value }))
              }
              style={{ marginBottom: "5px" }}
            />
            <br />
            <button
              onClick={() =>
                dispatch(addModule({ ...module, course: courseId }))
              }
              className="btn btn-success btn-sm"
            >
              Add
            </button>
            <button
              onClick={() => dispatch(updateModule(module))}
              className="btn btn-primary btn-sm"
              style={{ marginLeft: "5px" }}
            >
              Update
            </button>
          </li>

          {moduleList
            .filter((module) => module.course === courseId)
            .map((module, index) => (
              <li
                key={index}
                className="list-group-item"
                onClick={() => setSelectedModule(module)}
              >
                <div
                  style={
                    selectedModule._id === module._id
                      ? { marginBottom: "10px" }
                      : {}
                  }
                >
                  <FaEllipsisV className="me-2" />
                  {module.name}

                  <span className="float-end">
                    <button
                      onClick={() => dispatch(setModule(module))}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteModule(module._id))}
                      className="btn btn-danger btn-sm"
                      style={{ marginLeft: "5px" }}
                    >
                      Delete
                    </button>
                  </span>
                </div>
                {selectedModule._id === module._id && (
                  <ul className="list-group">
                    {module.lessons ? (
                      module.lessons?.map((lesson: any, index: any) => (
                        <li className="list-group-item" key={index}>
                          <FaEllipsisV className="me-2" />
                          {lesson.name}
                          <span className="float-end">
                            <FaCheckCircle className="text-success" />
                            <FaEllipsisV className="ms-2" />
                          </span>
                        </li>
                      ))
                    ) : (
                      <li className="list-group-item" key={index}>
                        <FaEllipsisV className="me-2" />
                        Placeholder Lesson
                        <span className="float-end">
                          <FaCheckCircle className="text-success" />
                          <FaEllipsisV className="ms-2" />
                        </span>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
