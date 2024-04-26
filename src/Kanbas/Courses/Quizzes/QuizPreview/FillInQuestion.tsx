import { useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { useEffect, useState } from "react";

let score = 0;
export default function FillInQuestion(props: {
  question: any;
  setScore: any;
  submitted: boolean;
}) {
  const { question, setScore, submitted } = props;
  const [userAnswers, setUserAnswers] = useState(
    new Array(question.fillInBlanksAnswers.length).fill("")
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  useEffect(() => {
    function isAnswered() {
      return userAnswers.reduce((acc, curr) => acc || curr !== "", false);
    }
    function calculateScore() {
      const correct = [];
      for (let i = 0; i < userAnswers.length; i++) {
        correct.push(
          question?.fillInBlanksAnswers[i]?.correctAnswer.toUpperCase() ===
            userAnswers[i]?.toUpperCase()
        );
      }
      return (
        (correct.reduce((acc, val) => acc + (val ? 1 : 0), 0) *
          question.points) /
        userAnswers.length
      );
    }
    if (isAnswered()) {
      setScore(calculateScore());
    } else {
      setScore(-1);
    }
  }, [question, userAnswers, setScore]);

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
        {Array.from(question.fillInBlanksAnswers)
          .sort((a: any, b: any) => a.order - b.order)
          .map((answer: any, index: number) => (
            <li className="list-group-item" key={answer.order}>
              <input
                value={userAnswers[index]}
                onChange={(e) =>
                  setUserAnswers(
                    userAnswers.map((a, idx) =>
                      idx === index ? e.target.value : a
                    )
                  )
                }
                type="text"
                disabled={submitted ? true : undefined}
                className="me-2"
              />
              <b>
                {submitted && quiz.showCorrectAnswers
                  ? `Correct answer: ${question.fillInBlanksAnswers[index].correctAnswer}`
                  : ""}
              </b>
            </li>
          ))}
      </ul>
    </>
  );
}
