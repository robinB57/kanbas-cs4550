import { useEffect } from "react";
import { FaCheckCircle, FaEllipsisV, FaPlusCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import * as client from "./client";
import { addQuiz, setQuizList } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";

export default function QuizList() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizList
  );

  useEffect(() => {
    client.findAllQuizzes().then((allQuizzes) =>
      dispatch(
        setQuizList(
          allQuizzes.filter((quiz: any) => {
            return quiz.course === courseId;
          })
        )
      )
    );
  }, [courseId]);

  function handleAddQuiz() {
    client.createQuiz(courseId as any).then((newQuiz) => {
      dispatch(addQuiz(newQuiz));
    });
  }

  function deleteQuiz(quizId: string) {
    client.deleteQuiz(quizId);
    dispatch(setQuizList(quizList));
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <input placeholder="Search for Quizzes" />
            </td>
            <td>
              <button onClick={handleAddQuiz}>+ Quiz</button>
              <button>Details</button>
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
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
            {quizList.map((quiz: any) => (
              <li className="list-group-item" key={quiz._id}>
                <FaEllipsisV className="me-2" />
                <Link to={`${quiz._id}/details`}>{quiz.title}</Link>
                {quiz.questions.length} Questions
                <span className="float-end">
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                    >
                      NOT WORKING MENU
                    </button>
                    <div className="dropdown-menu">
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                      <a className="dropdown-item" href="#">
                        Publish
                      </a>
                    </div>
                  </div>

                  <Link
                    to={`/Kanbas/Courses/${courseId}/Quizzes/${quiz._id}/details`}
                  >
                    edit
                  </Link>
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
