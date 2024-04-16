import { quizzes } from "../../Database";
import React from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

export default function Quizzes() {
    const { courseId } = useParams();
    const Quizlist = quizzes.filter(
      (quiz) => quiz.course === courseId
    );
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>
                <input placeholder="Search for Quizzes" />
              </td>
              <td>
                <button>+ Quiz</button>
                <button>Details</button>
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    NOT WORKING MENU
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <ul className="list-group wd-modules">
          <li className="list-group-item">
            <div>
              <FaEllipsisV className="me-2" /> QUIZZES
              <span className="float-end">
                <FaCheckCircle className="text-success" />
                <FaPlusCircle className="ms-2" />
                <FaEllipsisV className="ms-2" />
              </span>
            </div>
            <ul className="list-group">
              {Quizlist.map((quiz) => (
                <li className="list-group-item">
                  <FaEllipsisV className="me-2" />
                  <Link
                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}`}
                  >
                    {quiz.title}
                  </Link>
                  
                    {quiz.availability}
                    Not available until {quiz.availabledate}
                    Due {quiz.duedate}
                    {quiz.points} Points 
                    {quiz.qnumber} Questions
                  <span className="float-end">
                    <FaCheckCircle className="text-success" />
                    <FaEllipsisV className="ms-2" />
                  </span>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </>
    );
}

