import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import { useEffect } from "react";
import * as client from "./client";
import { setQuiz } from "./reducer";

export default function QuizDetails() {
  const dispatch = useDispatch();
  const { quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  useEffect(() => {
    if (quiz?._id !== quizId) {
      client.findQuiz(quizId as string).then((newQuiz) => {
        dispatch(setQuiz(newQuiz));
      });
    }
  }, [quiz, quizId, dispatch]);

  return (
    <>
      <table>
        {quiz ? (
          <tbody>
            <tr>
              <button>Publish</button>
              <button>Preview</button>
              <button>Edit</button>
              <hr></hr>
              <h3> {quiz.title} </h3>
              Quiz Type {quiz.quizType} <br></br>
              Points {quiz.points} <br></br>
              Assignment Group {quiz.assignmentGroup} <br></br>
              Shuffle Answers {quiz.shuffleAnswers} <br></br>
              Time Limit{quiz.timeLimit} <br></br>
              Multiple Attempts {quiz.multipleAttempts} <br></br>
              Show Correct Answers {quiz.showCorrectAnswers} <br></br>
              One Question at a Time {quiz.oneQuestionAtATime}
              <br></br>
              Webcam Required {quiz.webcamRequired}
              <br></br>
              Lock Questions After Answering {
                quiz.lockQuestionsAfterAnswering
              }{" "}
              <br></br>
            </tr>
            <tr>
              <td>Due</td>
              <td>For</td>
              <td>Available from</td>
              <td>Until</td>
            </tr>
            <hr></hr>
            <tr>
              <td>{quiz.dueDate}</td>
              <td>Everyone</td>
              <td>{quiz.availableDate}</td>
              <td>{quiz.untilDate}</td>
            </tr>
            <hr></hr>
          </tbody>
        ) : (
          <></>
        )}
      </table>
    </>
  );
}
