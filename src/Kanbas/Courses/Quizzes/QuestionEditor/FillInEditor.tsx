import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { KanbasState } from "../../../store";
import { useState } from "react";
import * as client from "../client";
import { Editor } from "@tinymce/tinymce-react";
import { TINYMCE_API_KEY } from "../../../../constants";
import { setQuestionList } from "../reducer";

export default function FillInEditor() {
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

  function addAnswer() {
    const newAnswers = question.fillInBlanksAnswers.concat([
      {
        correctAnswer: "New answer",
        order: question.fillInBlanksAnswers.length,
      },
    ]);
    setQuestion({
      ...question,
      fillInBlanksAnswers: newAnswers,
    });
  }

  function setAnswerText(text: any, order: number) {
    const answers = question.fillInBlanksAnswers;
    console.log(answers);
    setQuestion({
      ...question,
      fillInBlanksAnswers: answers.map((a: any) => {
        return {
          ...a,
          correctAnswer: a.order === order ? text : a.correctAnswer,
        };
      }),
    });
  }

  function deleteAnswer(order: any) {
    const newAnswers = question.fillInBlanksAnswers.filter(
      (a: any) => a.order !== order
    );
    setQuestion({ ...question, multipleChoiceAnswers: newAnswers });
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
      Blanks:
      <ul className="list-group">
        {Array.from(question.fillInBlanksAnswers)
          .sort((question: any) => question.order)
          .map((answer: any) => (
            <li className="list-group-item" key={answer.order}>
              <input
                onChange={(e) => setAnswerText(e.target.value, answer.order)}
                value={answer.correctAnswer}
                type="text"
              />
              <button
                className="btn btn-danger ms-2"
                onClick={() => deleteAnswer(answer.order)}
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
      <button className="btn btn-primary mt-2" onClick={addAnswer}>
        Add Answer
      </button>
      <br /> <br />
      <button className="btn btn-danger me-2" onClick={resetQuestion}>
        Cancel
      </button>
      <button className="btn btn-success" onClick={saveQuestion}>
        Save
      </button>
    </>
  );
}
