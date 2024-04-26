import { useNavigate, useParams } from "react-router-dom";
import * as client from "../client";
import { TINYMCE_API_KEY } from "../../../../constants";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { useState } from "react";
import { setQuestionList } from "../reducer";
import { add } from "../../../../Labs/a4/ReduxExamples/AddRedux/addReducer";

export default function MCEditor() {
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

  function setMCAnswer(answer: any, index: number) {
    const answers = question.multipleChoiceAnswers;
    answers[index] = answer;
    setQuestion({ ...question, multipleChoiceAnswers: answers });
  }

  function addAnswer() {
    console.log(question.multipleChoiceAnswers);
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

  function setCorrectAnswer(index: number) {
    const answers = question.multipleChoiceAnswers;
    setQuestion({
      ...question,
      multipleChoiceAnswers: answers.map((a: any, idx: number) => {
        return { ...a, isCorrect: idx === index };
      }),
    });
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
        {question.multipleChoiceAnswers
          .sort((question: any) => question.order)
          .map((answer: any, index: number) => (
            <li className="list-group-item" key={answer.order}>
              <input
                onChange={(e) =>
                  setMCAnswer({ ...question, title: e.target.value }, index)
                }
                value={answer.answerText}
                type="text"
              />
            </li>
          ))}
      </ul>
      <button onClick={addAnswer}>Add Answer</button>
      <br />
      <button onClick={resetQuestion}>Cancel</button>
      <button onClick={saveQuestion}>Save</button>
    </>
  );
}
