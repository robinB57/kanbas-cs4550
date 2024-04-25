import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { KanbasState } from "../../../store";
import { useState } from "react";
import * as client from "../client";
import { setQuestionList } from "../reducer";
import { Editor } from "@tinymce/tinymce-react";
import { TINYMCE_API_KEY } from "../../../../constants";

export default function FillInEditor() {
  const { questionId } = useParams();

  const dispatch = useDispatch();
  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );
  const [question, setQuestion] = useState(
    questionList?.find((q) => q._id === questionId)
  );

  function saveQuestion() {
    client.updateQuestion(question).then((newQuestion) => {
      const newQuestions = questionList.map((q) =>
        q._id === questionId ? newQuestion : q
      );
      dispatch(setQuestionList(newQuestions));
    });
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
      <ul className="list-group">
        {question.fillInBlanksAnswers
          .sort((question: any) => question.order)
          .map((answer: any, index: number) => (
            <li className="list-group-item">
              <input
                onChange={(e) =>
                  setQuestion({ ...question, title: e.target.value })
                }
                value={question.title}
                type="text"
              />
            </li>
          ))}
      </ul>
      <button onClick={resetQuestion}>Cancel</button>
      <button onClick={saveQuestion}>Save</button>
    </>
  );
}
