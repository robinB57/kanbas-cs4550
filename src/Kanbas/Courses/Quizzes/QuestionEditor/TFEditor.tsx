import { useNavigate, useParams } from "react-router-dom";
import * as client from "../client";
import { TINYMCE_API_KEY } from "../../../../constants";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { useState } from "react";
import { setQuestionList } from "../reducer";

export default function TFEditor() {
  const { questionId } = useParams();
  const { courseId, quizId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );
  const [question, setQuestion] = useState(
    questionList?.find((q) => q._id === questionId)
  );

  // this is what we call when we hit the save button. as long as the question is up to date we update the client on what happens and then saves it to the server + updates the local state of the question
  function saveQuestion() {
    client.updateQuestion(question).then((newQuestion) => {
      const newQuestions = questionList.map((q) =>
        q._id === questionId ? newQuestion : q
      );
      dispatch(setQuestionList(newQuestions));
    });
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit/questions`);
  }

  function resetQuestion() {
    setQuestion(questionList.find((q) => q._id === questionId));
  }

  return (
    <>
      <input
        onChange={(e) => setQuestion({ ...question, title: e.target.value })}
        value={question.title}
        type="text"
      />
      pts:
      <input
        onChange={(e) =>
          setQuestion({
            ...question,
            points: e.target.value,
          })
        }
        value={question.points}
        type="text"
      />
      Question:
      <Editor
        apiKey={TINYMCE_API_KEY}
        value={question.text}
        onEditorChange={(newText, editor) => {
          setQuestion({ ...question, text: newText });
        }}
      />
      Answers:
      <label>
        <input
          value={question.trueOrFalseAnswer}
          type="checkbox"
          onChange={(e) =>
            setQuestion({
              ...question,
              trueOrFalseAnswer: "TRUE",
            })
          }
        />
        True
      </label>
      <label>
        <input
          value={question.trueOrFalseAnswer}
          type="checkbox"
          onChange={(e) =>
            setQuestion({
              ...question,
              trueOrFalseAnswer: "FALSE",
            })
          }
        />
        False
      </label>
      <button onClick={resetQuestion}>Cancel</button>
      <button onClick={saveQuestion}>Save</button>
    </>
  );
}
