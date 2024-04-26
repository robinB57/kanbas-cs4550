import { Link, useNavigate, useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { addQuestion, deleteQuestion } from "./reducer";
import { useEffect } from "react";
import { fetchDataIfNeeded } from "./clientUtil";
import { BsTrash } from "react-icons/bs";
import { Button } from "react-bootstrap";

export default function QuestionList() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataIfNeeded(dispatch, courseId, quizId);
  }, [courseId, quizId, dispatch]);

  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );

  function handleAddQuestion() {
    client.createQuestion(quizId as any).then((newQuestion) => {
      dispatch(addQuestion(newQuestion));
      navigate(
        `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit/questions/${newQuestion._id}`
      );
    });
  }

  function handleDeleteQuestion(questionId: any) {
    client.deleteQuestion(quizId as string, questionId).then(() => {
      dispatch(deleteQuestion(questionId));
    });
  }

  function navigateToDetails() {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
  }

  return (
    <>
      <div>
        <button className="btn btn-light" onClick={navigateToDetails}>
          Details
        </button>
        <button className="btn btn-danger">Questions</button>
        <hr></hr>
        <ul className="list-group">
          {questionList.map((question: any) => (
            <li className="list-group-item">
              <Link to={`${question._id}`}>{question.title}</Link>
              <span className="float-end">
                <Button
                  onClick={() => handleDeleteQuestion(question._id)}
                  className="btn-danger"
                >
                  <BsTrash />
                </Button>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button className="btn btn-danger" onClick={handleAddQuestion}>
          {" "}
          + Question
        </button>
      </div>
    </>
  );
}
