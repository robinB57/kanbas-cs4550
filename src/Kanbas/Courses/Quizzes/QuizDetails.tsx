import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { KanbasState } from "../../store";
import { useEffect } from "react";
import { fetchData } from "./util";
import * as client from "./client";
import { setQuiz, setQuizList } from "./reducer";

export default function QuizDetails() {
  const dispatch = useDispatch();
  const { courseId, quizId } = useParams();
  const quizList = useSelector(
    (state: KanbasState) => state.quizzesReducer.quizList
  );
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );

  const navigate = useNavigate();

  useEffect(() => {
    fetchData(dispatch, courseId, quizId);
  }, [courseId, quizId, dispatch]);

  function handlePreview() {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/preview`);
  }

  function handleEdit() {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit`);
  }

  function publishQuiz(isPublished: boolean, quiz: any) {
    client.updateQuiz({ ...quiz, isPublished }).then((newQuiz) => {
      dispatch(setQuiz(newQuiz));
      dispatch(
        setQuizList(quizList.map((q) => (q._id === quiz._id ? newQuiz : q)))
      );
    });
  }

  return (
    <>
      <table>
        {quiz ? (
          <tbody>
            <tr>
              <div className="d-flex">
                {quiz.isPublished ? (
                  <button
                    className="btn btn-light"
                    onClick={() => publishQuiz(false, quiz)}
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    className="btn btn-success"
                    onClick={() => publishQuiz(true, quiz)}
                  >
                    Publish
                  </button>
                )}
                <button className="btn btn-light" onClick={handlePreview}>
                  Preview
                </button>
                <button className="btn btn-light" onClick={handleEdit}>
                  Edit
                </button>
                <hr></hr>
              </div>
              <div className="padded">
                <h3> {quiz.title} </h3>
                <p dangerouslySetInnerHTML={{ __html: quiz.description }}></p>
                <b> Quiz Type: </b> {quiz.quizType} <br></br>
                <b> Points: </b>
                {questionList.reduce(
                  (acc, question) => acc + question.points,
                  0
                )}
                <br></br>
                <b> Assignment Group: </b> {quiz.assignmentGroup} <br></br>
                <b> Shuffle Answers: </b> {quiz.shuffleAnswers ? "Yes" : "No"}{" "}
                <br></br>
                <b> Time Limit: </b> {quiz.timeLimit + " minutes"} <br></br>
                <b> Multiple Attempts: </b>{" "}
                {quiz.multipleAttempts ? "Yes" : "No"} <br></br>
                <b> Show Correct Answers: </b>{" "}
                {quiz.showCorrectAnswers ? "Yes" : "No"}
                <br></br>
                <b> One Question at a Time: </b>{" "}
                {quiz.oneQuestionAtATime ? "Yes" : "No"}
                <br></br>
                <b> Webcam Required: </b> {quiz.webcamRequired ? "Yes" : "No"}
                <br></br>
                <b> Lock Questions After Answering: </b>{" "}
                {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"} <br></br>
              </div>
            </tr>
            <tr>
              <td>
                <b>Due</b>
              </td>
              <td>
                <b>For</b>
              </td>
              <td>
                <b>Available from</b>
              </td>
              <td>
                <b>Until</b>
              </td>
              <hr></hr>
            </tr>
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
