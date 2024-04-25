import { Link, useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import MCEditor from "./QuestionEditor/MCEditor";
import TFEditor from "./QuestionEditor/TFEditor";
import FillInEditor from "./QuestionEditor/FillInEditor";
import * as client from "./client";
import { addQuestion } from "./reducer";
import { setQuestionList } from "./reducer";

export default function QuestionList() {
  const { questionId } = useParams();
  const dispatch = useDispatch();

  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );
  const questionType = questionList.find(
    (q: any) => q._id === questionId
  ).questionType;

  function handleAddQuestion() {
    client.createQuestion(questionId as any).then((newQuestion) => {
      dispatch(addQuestion(newQuestion));
    });
  }

  // i think this one is wrong
  function saveQuestion() {
    client.updateQuestion(questionId).then((questions) => {
      dispatch(setQuestionList(questions));
    });
  }

  return (
    <>
      <div>
        <ul className="list-group">
          {questionList.map((question: any) => (
            <li className="list-group-item">
              <Link to={`${question.questionId}/details`}>
                {question.title}
              </Link>
              <span className="float-end"></span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={handleAddQuestion}> + Question</button>
      </div>
      <button onClick={saveQuestion}>Save</button>
    </>
  );
}
