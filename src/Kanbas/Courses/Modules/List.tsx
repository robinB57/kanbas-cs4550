import React, { useEffect, useState } from "react";
import "./module-list.css";
import { FaEllipsisV, FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import {
  addModule,
  deleteModule,
  setModule,
  updateModule,
  setModules,
} from "./reducer";
import * as client from "./client";

export default function ModuleList() {
  const { courseId } = useParams();
  useEffect(() => {
    client
      .findModulesForCourse(courseId as string)
      .then((modules) => dispatch(setModules(modules)));
  }, [courseId]);

  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const dispatch = useDispatch();
  const [selectedModuleId, setSelectedModuleId] = useState("-1");

  const handleAddModule = async () => {
    const newModule = await client.createModule(courseId as string, module);
    dispatch(addModule(newModule));
  };
  const handleUpdateModule = async () => {
    await client.updateModule(module);
    dispatch(updateModule(module));
  };
  const handleDeleteModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

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
              onClick={handleAddModule}
              className="btn btn-success btn-sm"
            >
              Add
            </button>
            <button
              onClick={handleUpdateModule}
              className="btn btn-primary btn-sm"
              style={{ marginLeft: "5px" }}
            >
              Update
            </button>
          </li>

          {moduleList
            .filter((module) => module.course === courseId)
            .map((module, index) => (
              <li key={index} className="list-group-item">
                <div
                  style={
                    selectedModuleId === module._id
                      ? { marginBottom: "10px" }
                      : {}
                  }
                  onClick={() =>
                    selectedModuleId === module._id
                      ? setSelectedModuleId("-1")
                      : setSelectedModuleId(module._id)
                  }
                >
                  <FaEllipsisV className="me-2" />
                  {module.name}

                  <span className="float-end">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        dispatch(setModule(module));
                      }}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteModule(module._id);
                      }}
                      className="btn btn-danger btn-sm"
                      style={{ marginLeft: "5px" }}
                    >
                      Delete
                    </button>
                  </span>
                </div>
                {selectedModuleId === module._id && (
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
