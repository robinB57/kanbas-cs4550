import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { KanbasState } from "../../../store";
import { useEffect, useState } from "react";
import { fetchDataIfNeeded } from "../clientUtil";
import MCQuestion from "./MCQuestion";
import TFQuestion from "./TFQuestion";
import FillInQuestion from "./FillInQuestion";

export default function QuizPreview() {
  const dispatch = useDispatch();
  const { courseId, quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );

  const [userScores, setUserScores] = useState([] as any[]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchDataIfNeeded(dispatch, courseId, quizId);
  }, [dispatch, courseId, quizId]);

  useEffect(() => console.log(userScores), [userScores]);

  function renderQuestion(index: number) {
    if (!userScores.length) {
      setUserScores(new Array(questionList.length).fill(-1));
    }
    const question = questionList[index];
    const questionType = question.questionType;
    const setScore = (newAnswer: any) => {
      setUserScores(
        userScores.map((a, idx) => (idx === index ? newAnswer : a))
      );
    };

    switch (questionType) {
      case "MULTIPLE_CHOICE":
        return (
          <MCQuestion
            question={question}
            setScore={setScore}
            submitted={submitted}
          />
        );
      case "TRUE_OR_FALSE":
        return (
          <TFQuestion
            question={question}
            setScore={setScore}
            submitted={submitted}
          />
        );
      case "FILL_IN_BLANKS":
        return (
          <FillInQuestion
            question={question}
            setScore={setScore}
            submitted={submitted}
          />
        );
    }
  }

  return (
    <>
      <table className="qpreview">
        <tbody>
          <tr>
            <td>
              <h1>{quiz?.title}</h1>
              {submitted ? (
                <h2>
                  <b>
                    {`Your total score: ${userScores.reduce(
                      (acc, curr) => acc + (curr === -1 ? 0 : curr),
                      0
                    )} / ${questionList.reduce(
                      (acc, curr) => acc + curr.points,
                      0
                    )}`}
                  </b>
                </h2>
              ) : (
                ""
              )}
              {quiz?.showCorrectAnswers ? "" : "Correct answers are hidden"}
              <br />
              <h3>Quiz Instructions:</h3>
              <p dangerouslySetInnerHTML={{ __html: quiz?.description }}></p>
              <br />
              <ul className="list-group">
                {questionList.map((question: any, index: number) => (
                  <li className="list-group-item" key={question._id}>
                    {renderQuestion(index)}
                  </li>
                ))}
              </ul>
            </td>
            <td className="quizpreview-questions">
              <div className="quizpreview-questions" style={{ width: "400px" }}>
                <ul className="list-group">
                  Quiz Progress:
                  {questionList.map((question: any, index: number) => (
                    <li className="list-group-item" key={question._id}>
                      <input
                        type="checkbox"
                        disabled
                        checked={userScores[index] !== -1 ? true : false}
                        className="me-2"
                      />
                      {question.title}
                    </li>
                  ))}
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <br />
              {submitted ? (
                <span>
                  <button className="btn btn-danger" disabled>
                    Submit Quiz
                  </button>
                </span>
              ) : (
                <button
                  className="btn btn-danger"
                  onClick={() => setSubmitted(true)}
                >
                  Submit Quiz
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
