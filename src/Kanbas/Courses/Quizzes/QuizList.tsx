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
import { fetchData } from "./util";

export default function QuizList() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizList
  );

  useEffect(() => {
    fetchData(dispatch, courseId);
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
              <li className="list-group-item align-middle" key={quiz._id}>
                <FaEllipsisV className="me-2" />
                <Link to={`${quiz._id}/details`} className="btn btn-link">
                  {quiz.title}
                </Link>
                {"          "}
                {quiz.questions.length} Questions -
                {quiz.isPublished ? (
                  <span>
                    <FaCheckCircle className="ms-2" />
                    Published
                  </span>
                ) : (
                  <span>
                    <FaTimesCircle className="ms-2" />
                    Not Published
                  </span>
                )}
                <span className="float-end">
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
