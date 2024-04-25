import { Link, useNavigate, useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { addQuestion } from "./reducer";
import { useEffect } from "react";
import { fetchData } from "./util";

export default function QuestionList() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(dispatch, courseId, quizId);
  }, [courseId, quizId, dispatch]);

  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );

  function handleAddQuestion() {
    client.createQuestion(quizId as any).then((newQuestion) => {
      dispatch(addQuestion(newQuestion));
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
              <span className="float-end"></span>
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
