import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import { useEffect } from "react";
import { fetchData } from "./util";

export default function QuizPreview() {
  const dispatch = useDispatch();
  const { courseId, quizId } = useParams();
  // const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );

  useEffect(() => {
    fetchData(dispatch, courseId, quizId);
  }, [dispatch, courseId, quizId]);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <h3>Quiz Instructions</h3>
              <ul className="list-group">
                {questionList.map((question: any) => (
                  <li className="list-group-item" key={question._id}>
                    {question.title} : {question.points} Points
                    <hr></hr>
                    {question.text}
                  </li>
                ))}
              </ul>
            </td>
            <td>
              <div className="quizpreview-questions" style={{ width: "250px" }}>
                Questions
                <ul className="list-group">
                  {questionList.map((question: any) => (
                    <li className="list-group-item" key={question._id}>
                      {question.title}
                    </li>
                  ))}
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <button className="btn btn-danger"> Submit Quiz </button>
          </tr>
        </tbody>
      </table>
    </>
  );
}
