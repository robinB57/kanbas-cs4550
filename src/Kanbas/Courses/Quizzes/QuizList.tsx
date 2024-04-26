import { useEffect } from "react";
import {
  FaCheckCircle,
  FaEllipsisV,
  FaPlusCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import { addQuiz, setQuizList } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import { Dropdown } from "react-bootstrap";
import { fetchQuizzes } from "./clientUtil";
import { formatDate } from "./util";

export default function QuizList() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizList
  );

  useEffect(() => {
    fetchQuizzes(dispatch, courseId as string);
  }, [courseId, dispatch]);

  function handleAddQuiz() {
    client.createQuiz(courseId as any).then((newQuiz) => {
      dispatch(addQuiz(newQuiz));
      navigate(`${newQuiz._id}/details`);
    });
  }

  function deleteQuiz(quizId: string) {
    client.deleteQuiz(quizId);
    dispatch(setQuizList(quizList.filter((q) => q._id !== quizId)));
  }

  function publishQuiz(isPublished: boolean, quiz: any) {
    client.updateQuiz({ ...quiz, isPublished }).then((newQuiz) => {
      dispatch(
        setQuizList(quizList.map((q) => (q._id === quiz._id ? newQuiz : q)))
      );
    });
  }

  function dateInfo(quiz: any) {
    const availableDate = new Date(quiz.availableDate);
    const untilDate = new Date(quiz.untilDate);
    const today = new Date();
    if (today < availableDate) {
      return `Not available until ${availableDate.toDateString()}`;
    } else if (today < untilDate) {
      return `Available until ${availableDate.toDateString()}`;
    } else {
      return "Closed";
    }
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
              <button className="btn btn-danger" onClick={handleAddQuiz}>
                + Quiz
              </button>
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
              <li
                className="list-group-item align-middle d-inline-flex justify-content-between"
                key={quiz._id}
              >
                <span>
                  <FaEllipsisV className="me-2" />
                  <Link
                    to={`${quiz._id}/details`}
                    className="btn btn-link py-0"
                  >
                    {quiz.title}
                  </Link>
                  {quiz.questions.length + " Questions"}
                  {quiz.isPublished ? (
                    <span>
                      <FaCheckCircle className="ms-2 me-1" />
                      Published
                    </span>
                  ) : (
                    <span>
                      <FaTimesCircle className="ms-2 me-1" />
                      Not Published
                    </span>
                  )}
                  <br />
                  <span className="d-flex flex-row">
                    <p>{dateInfo(quiz)}</p>
                    {quiz.dueDate ? <p className="ms-3 me-3">|</p> : ""}
                    {quiz.dueDate ? (
                      <p>{`Due ${formatDate(quiz.dueDate)}`}</p>
                    ) : (
                      ""
                    )}
                  </span>
                </span>
                <span>
                  <Dropdown>
                    <Dropdown.Toggle variant="secondary">
                      &#x22EE; Actions
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => navigate(`${quiz._id}/edit`)}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => deleteQuiz(quiz._id)}>
                        Delete
                      </Dropdown.Item>
                      {quiz.isPublished ? (
                        <Dropdown.Item onClick={() => publishQuiz(false, quiz)}>
                          Unpublish
                        </Dropdown.Item>
                      ) : (
                        <Dropdown.Item onClick={() => publishQuiz(true, quiz)}>
                          Publish
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </span>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </>
  );
}
