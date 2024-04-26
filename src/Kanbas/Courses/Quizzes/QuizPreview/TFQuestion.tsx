import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { useEffect, useState } from "react";

let score = 0;
export default function TFQuestion(props: {
  question: any;
  setScore: any;
  submitted: boolean;
}) {
  const { question, setScore, submitted } = props;
  const [userAnswer, setUserAnswer] = useState("");
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  useEffect(() => {
    function isAnswered() {
      return userAnswer !== "";
    }
    function calculateScore() {
      score = userAnswer === question.trueOrFalseAnswer ? question.points : 0;
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
        <li className="list-group-item">
          <label>
            <input
              type="radio"
              name={question._id}
              id="TRUE"
              value="TRUE"
              onChange={(e) => setUserAnswer("TRUE")}
              defaultChecked={userAnswer === "TRUE" ? true : undefined}
              disabled={submitted ? true : undefined}
              className="me-2"
            />
            True
          </label>
        </li>
        <li className="list-group-item">
          <label>
            <input
              type="radio"
              name={question._id}
              id="FALSE"
              value="FALSE"
              onChange={(e) => setUserAnswer("FALSE")}
              defaultChecked={userAnswer === "FALSE" ? true : undefined}
              disabled={submitted ? true : undefined}
              className="me-2"
            />
            False
          </label>
        </li>
      </ul>
      <b>
        {submitted && quiz.showCorrectAnswers
          ? `Correct answer: ${
              question.trueOrFalseAnswer === "TRUE" ? "True" : "False"
            }`
          : ""}
      </b>
    </>
  );
}
