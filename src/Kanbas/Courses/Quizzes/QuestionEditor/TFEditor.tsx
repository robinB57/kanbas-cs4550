import { useNavigate, useParams } from "react-router-dom";
import * as client from "../client";
import { TINYMCE_API_KEY } from "../../../../constants";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { useState } from "react";
import { setQuestionList } from "../reducer";

export default function TFEditor() {
  const { questionId, courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );
  const [question, setQuestion] = useState(
    questionList?.find((q) => q._id === questionId)
  );

  function saveQuestion() {
    client.updateQuestion(quizId as string, question).then((newQuestion) => {
      const newQuestions = questionList.map((q) =>
        q._id === questionId ? newQuestion : q
      );
      dispatch(setQuestionList(newQuestions));
    });
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit/questions`);
  }

  function resetQuestion() {
    setQuestion(questionList.find((q) => q._id === questionId));
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit/questions`);
  }

  return (
    <>
      Title:
      <input
        onChange={(e) => setQuestion({ ...question, title: e.target.value })}
        value={question.title}
        type="text"
        className="ms-2"
      />
      <br />
      Points:
      <input
        onChange={(e) =>
          setQuestion({
            ...question,
            points: e.target.value,
          })
        }
        value={question.points}
        type="number"
        className="ms-2"
      />
      <br /> <br />
      Question:
      <Editor
        apiKey={TINYMCE_API_KEY}
        value={question.text}
        onEditorChange={(newText, editor) => {
          setQuestion({ ...question, text: newText });
        }}
      />
      <br />
      Answer:
      <br />
      <ul className="list-group">
        <li className="list-group-item">
          <label>
            <input
              type="radio"
              name="correctAnswer"
              id="TRUE"
              value="TRUE"
              onClick={(e) =>
                setQuestion({
                  ...question,
                  trueOrFalseAnswer: "TRUE",
                })
              }
              defaultChecked={
                question.trueOrFalseAnswer === "TRUE" ? true : undefined
              }
              className="me-2"
            />
            True
          </label>
        </li>
        <li className="list-group-item">
          <label>
            <input
              type="radio"
              name="correctAnswer"
              id="FALSE"
              value="FALSE"
              onClick={(e) =>
                setQuestion({
                  ...question,
                  trueOrFalseAnswer: "FALSE",
                })
              }
              defaultChecked={
                question.trueOrFalseAnswer === "FALSE" ? true : undefined
              }
              className="me-2"
            />
            False
          </label>
        </li>
      </ul>
      <br /> <br />
      <button className="btn btn-danger" onClick={resetQuestion}>
        Cancel
      </button>
      <button className="btn btn-success" onClick={saveQuestion}>
        Save
      </button>
    </>
  );
}
