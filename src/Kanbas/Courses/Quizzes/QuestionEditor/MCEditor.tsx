import { useParams } from "react-router-dom";
import * as client from "../client";
import { TINYMCE_API_KEY } from "../../../../constants";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { useState } from "react";
import { setQuestionList } from "../reducer";
import { BsTrash } from "react-icons/bs";

export default function MCEditor() {
  const { questionId, quizId } = useParams();
  const dispatch = useDispatch();

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
  }

  function resetQuestion() {
    setQuestion(questionList.find((q) => q._id === questionId));
  }

  function addAnswer() {
    const newAnswers = question.multipleChoiceAnswers.concat([
      {
        answerText: "New answer",
        order: question.multipleChoiceAnswers.length,
      },
    ]);
    setQuestion({
      ...question,
      multipleChoiceAnswers: newAnswers,
    });
  }

  function setAnswerText(text: any, order: number) {
    const answers = question.multipleChoiceAnswers;
    setQuestion({
      ...question,
      multipleChoiceAnswers: answers.map((a: any) => {
        return { ...a, answerText: a.order === order ? text : a.answerText };
      }),
    });
  }

  function deleteAnswer(order: any) {
    const newAnswers = question.multipleChoiceAnswers.filter(
      (a: any) => a.order !== order
    );
    setQuestion({ ...question, multipleChoiceAnswers: newAnswers });
  }

  function setCorrectAnswer(order: number) {
    const answers = question.multipleChoiceAnswers;
    setQuestion({
      ...question,
      multipleChoiceAnswers: answers.map((a: any, idx: number) => {
        return { ...a, isCorrect: a.order === order };
      }),
    });
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
      Answers:
      <ul className="list-group">
        {Array.from(question.multipleChoiceAnswers)
          .sort((a: any, b: any) => a.order - b.order)
          .map((answer: any) => (
            <li className="list-group-item" key={answer.order}>
              <input
                type="radio"
                name="correctAnswer"
                id={answer.order}
                value={answer.order}
                onClick={() => setCorrectAnswer(answer.order)}
                checked={answer.isCorrect ? true : undefined}
                className="me-2"
              />
              <input
                onChange={(e) => setAnswerText(e.target.value, answer.order)}
                value={answer.answerText}
                type="text"
              />
              <button
                className="btn btn-danger ms-2 float-end"
                onClick={() => deleteAnswer(answer.order)}
              >
                <BsTrash />
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
