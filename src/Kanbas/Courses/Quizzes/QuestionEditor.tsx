import { Link, useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import MCEditor from "./QuestionEditor/MCEditor";
import TFEditor from "./QuestionEditor/TFEditor";
import FillInEditor from "./QuestionEditor/FillInEditor";
import * as client from "./client";
import { addQuestion } from "./reducer";
import { setQuestionList } from "./reducer";

export default function QuestionEditor() {
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
    client.updateQuestion(questionId).then((question) => {
      dispatch(setQuestionList(question));
    });
  }

  function getQuestionEditor() {
    switch (questionType) {
      case "MULTIPLE_CHOICE":
        return <MCEditor />;
      case "TRUE_OR_FALSE":
        return <TFEditor />;
      case "FILL_IN_BLANKS":
        return <FillInEditor />;
    }
  }

  return <>{getQuestionEditor()}</>;
}
