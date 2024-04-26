import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import { useEffect } from "react";
import { fetchDataIfNeeded } from "./clientUtil";
import MCQuestion from "./QuizPreview/MCQuestion";
import TFQuestion from "./QuizPreview/TFQuestion";
import FillInQuestion from "./QuizPreview/FillInQuestion";

export default function QuizPreview() {
  const dispatch = useDispatch();
  const { courseId, quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );

  useEffect(() => {
    fetchDataIfNeeded(dispatch, courseId, quizId);
  }, [dispatch, courseId, quizId]);

  function renderQuestion(questionid: number) {
    const qType = questionList?.find(
      (q: any) => q._id === questionid
    )?.questionType;
    switch (qType) {
      case "MULTIPLE_CHOICE":
        return <MCQuestion />;
      case "TRUE_OR_FALSE":
        return <TFQuestion />;
      case "FILL_IN_BLANKS":
        return <FillInQuestion />;
    }
  }

  return (
    <>
      <table className="qpreview">
        <tbody>
          <tr>
            <td>
              <h3>Quiz Instructions</h3>
              <p dangerouslySetInnerHTML={{ __html: quiz?.description }}></p>
              <ul className="list-group">
                {questionList.map((question: any) => (
                  <li className="list-group-item" key={question._id}>
                    renderQuestion(question._id)
                  </li>
                ))}
              </ul>
            </td>
            <td className="quizpreview-questions">
              <div className="quizpreview-questions" style={{ width: "250px" }}>
                <ul className="list-group">
                  {questionList.map((question: any) => (
                    <li className="list-group-item" key={question._id}>
                      {question.title}
                      {question.text}
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
