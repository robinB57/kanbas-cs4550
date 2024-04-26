import { useNavigate, useParams } from "react-router-dom";
import { KanbasState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import MCEditor from "./MCEditor";
import TFEditor from "./TFEditor";
import FillInEditor from "./FillInEditor";
import { useEffect } from "react";
import { fetchDataIfNeeded } from "../clientUtil";
import { setQuestionList } from "../reducer";

export default function QuestionEditor() {
  const { courseId, quizId, questionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataIfNeeded(dispatch, courseId, quizId);
  }, [courseId, quizId, dispatch]);

  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );

  const questionType = questionList?.find(
    (q: any) => q._id === questionId
  )?.questionType;

  function setQuestionType(type: any) {
    dispatch(
      setQuestionList(
        questionList.map((q) =>
          q._id === questionId ? { ...q, questionType: type } : q
        )
      )
    );
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

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() =>
          navigate(
            `/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit/questions`
          )
        }
      >
        Back
      </button>
      <br />
      <br />
      Question type:
      <select
        className="form-select form-select-lg"
        id="questionType"
        onChange={(e) => setQuestionType(e.target.value)}
        defaultValue={questionType}
      >
        <option value="MULTIPLE_CHOICE">Multiple choice</option>
        <option value="TRUE_OR_FALSE">True or false</option>
        <option value="FILL_IN_BLANKS">Fill in the blanks</option>
      </select>
      <br />
      {getQuestionEditor()}
    </>
  );
}
