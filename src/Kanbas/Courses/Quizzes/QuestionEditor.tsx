import { useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import MCEditor from "./QuestionEditor/MCEditor";
import TFEditor from "./QuestionEditor/TFEditor";
import FillInEditor from "./QuestionEditor/FillInEditor";
import { useEffect } from "react";
import { fetchData } from "./util";

export default function QuestionEditor() {
  const { courseId, quizId, questionId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(dispatch, courseId, quizId);
  }, [courseId, quizId, dispatch]);

  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );
  const questionType = questionList?.find(
    (q: any) => q._id === questionId
  )?.questionType;

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
