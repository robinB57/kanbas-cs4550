import { Link, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { TINYMCE_API_KEY } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";
import { setQuiz } from "./reducer";

export default function QuizEditor() {
  const { quizId } = useParams();
  const dispatch = useDispatch();

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  useEffect(() => {
    client.findQuiz(quizId as string).then((quiz) => dispatch(setQuiz(quiz)));
  }, [quizId]);

  function saveQuiz() {
    client.updateQuiz(quiz).then((quiz) => {
      dispatch(setQuiz(quiz));
    });
  }

  function resetQuiz() {
    setQuiz(quiz.find(quizId));
  }

  return (
    <>
      <table>
        <tbody>
          <tr></tr>
          <hr></hr>
          <div>
            <button>Details</button>
            <button>Questions</button>
          </div>
          Quiz Instructions: <br></br>
          <Editor
            apiKey={TINYMCE_API_KEY}
            value={quiz.description}
            onEditorChange={(newText) => {
              dispatch(setQuiz(newText));
            }}
          />
          <div>
            Quiz Title <br></br>
            <input
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
              value={quiz.title}
              type="text"
            />
            Points
            <input
              onChange={(e) => setQuiz({ ...quiz, points: e.target.value })}
              value={quiz.points}
              type="text"
            />{" "}
            <br></br>
            Assignment Group QUIZZES <br></br>
            <label>
              <input
                value={quiz.shuffleAnswers}
                type="checkbox"
                onChange={(e) =>
                  setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
                }
              />
              Shuffle Answers
            </label>
            <br></br>
            <label>
              <input
                value={quiz.timeLimit}
                type="number"
                onChange={(e) =>
                  setQuiz({ ...quiz, timeLimit: e.target.checked })
                }
              />
              Time Limit
            </label>
            <label>
              <input
                value={quiz.multipleAttempts}
                type="checkbox"
                onChange={(e) =>
                  setQuiz({ ...quiz, multipleAttempts: e.target.checked })
                }
              />
              Multiple Attempts
            </label>
            <br></br>
            <label>
              <input
                value={quiz.showCorrectAnswers}
                type="checkbox"
                onChange={(e) =>
                  setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })
                }
              />
              Show Correct Answers
            </label>
            <br></br>
            <label>
              <input
                value={quiz.oneQuestionAtATime}
                type="checkbox"
                onChange={(e) =>
                  setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
                }
              />
              One Question at a Time
            </label>
            <br></br>
            <label>
              <input
                value={quiz.webcamRequired}
                type="checkbox"
                onChange={(e) =>
                  setQuiz({ ...quiz, webcamRequired: e.target.checked })
                }
              />
              Webcam Required
            </label>
            <br></br>
            <label>
              <input
                value={quiz.lockQuestionsAfterAnswering}
                type="checkbox"
                onChange={(e) =>
                  setQuiz({
                    ...quiz,
                    lockQuestionsAfterAnswering: e.target.checked,
                  })
                }
              />
              Lock Questions After Answering
            </label>
            <br></br>
            Access code:
            <input
              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
              value={quiz.accessCode}
              type="text"
            />
            <br></br>
            <label>
              <input
                value={quiz.dueDate}
                type="Date"
                onChange={(e) =>
                  setQuiz({ ...quiz, dueDate: e.target.checked })
                }
              />
              Due Date
            </label>
            <br></br>
            <label>
              <input
                value={quiz.untilDate}
                type="Date"
                onChange={(e) =>
                  setQuiz({ ...quiz, untilDate: e.target.checked })
                }
              />
              Until Date
            </label>
            <br></br>
            <label>
              <input
                value={quiz.availableDate}
                type="Date"
                onChange={(e) =>
                  setQuiz({ ...quiz, availableDate: e.target.checked })
                }
              />
              Available Date
            </label>
            <br></br>
          </div>
          <hr></hr>
          <button onClick={saveQuiz}>Save</button>
          <button onClick={saveQuiz}>Save and Publish</button>
          <Link
            to={`/Kanbas/Courses/Quizzes`}
            className="btn btn-danger float-end"
          >
            Cancel
          </Link>
        </tbody>
      </table>
    </>
  );
}
