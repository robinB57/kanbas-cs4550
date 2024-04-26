import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { useEffect, useState } from "react";

let score = 0;
export default function MCQuestion(props: {
  question: any;
  setScore: any;
  submitted: boolean;
}) {
  const { question, setScore, submitted } = props;
  const [userAnswer, setUserAnswer] = useState("" as any);
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  useEffect(() => {
    function isAnswered() {
      return userAnswer !== "";
    }

    function calculateScore() {
      score =
        userAnswer * 1 ===
        question.multipleChoiceAnswers.find((a: any) => a.isCorrect).order
          ? question.points
          : 0;
    }
    if (isAnswered()) {
      calculateScore();
      setScore(score);
    } else {
      setScore(-1);
    }
  }, [question, userAnswer, setScore]);

  return (
    <>
      <h4>
        <b>{question.title}:</b>{" "}
        {submitted
          ? `${Math.round(score * 100) / 100} / ${question.points} Points`
          : `${question.points} Points`}
      </h4>
      <hr />
      <p dangerouslySetInnerHTML={{ __html: question.text }}></p>
      Answers:
      <ul className="list-group">
        {Array.from(question.multipleChoiceAnswers)
          .sort((a: any, b: any) => a.order - b.order)
          .map((answer: any) => (
            <li className="list-group-item" key={answer.order}>
              <input
                type="radio"
                name={question._id}
                id={answer.order}
                value={answer.order}
                onChange={(e) => setUserAnswer(e.target.value)}
                defaultChecked={userAnswer === answer.order ? true : undefined}
                disabled={submitted ? true : undefined}
                className="me-2"
              />
              <label htmlFor={answer.order}>{answer.answerText}</label>
            </li>
          ))}
      </ul>
      <b>
        {submitted && quiz.showCorrectAnswers
          ? `Correct answer: ${
              question.multipleChoiceAnswers.find((a: any) => a.isCorrect)
                .answerText
            }`
          : ""}
      </b>
    </>
  );
}
