import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { useEffect } from "react";
import { TINYMCE_API_KEY } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../store";
import * as client from "./client";
import { setQuiz } from "./reducer";
import { fetchDataIfNeeded, fetchEverything } from "./clientUtil";

export default function QuizEditor() {
  const { courseId, quizId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataIfNeeded(dispatch, courseId, quizId);
  }, [courseId, quizId, dispatch]);

  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);

  function saveQuiz() {
    client.updateQuiz(quiz).then((quiz) => {
      fetchEverything(dispatch, courseId as string, quizId as string);
      navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/details`);
    });
  }

  function publishQuiz() {
    client.updateQuiz({ ...quiz, isPublished: true }).then((quiz) => {
      fetchEverything(dispatch, courseId as string, quizId as string);
      navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
    });
  }

  function cancelEdit() {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes`);
  }

  function navigateToQuestions() {
    navigate(`/Kanbas/Courses/${courseId}/Quizzes/${quizId}/edit/questions`);
  }

  return (
    <>
      <div>
        <button className="btn btn-dark me-2">Details</button>
        <button className="btn btn-light" onClick={navigateToQuestions}>
          Questions
        </button>
      </div>
      <hr></hr>
      Quiz Title:
      <input
        onChange={(e) => dispatch(setQuiz({ ...quiz, title: e.target.value }))}
        value={quiz?.title}
        type="text"
        className="ms-2"
      />
      <br></br>
      Quiz Instructions: <br></br>
      <Editor
        apiKey={TINYMCE_API_KEY}
        value={quiz?.description}
        onEditorChange={(newText) => {
          dispatch(setQuiz({ ...quiz, description: newText }));
        }}
      />
      <div>
        Assignment Group:
        <select
          onChange={(e) =>
            dispatch(setQuiz({ ...quiz, assignmentGroup: e.target.value }))
          }
          defaultValue={quiz?.assignmentGroup}
          className="ms-2"
        >
          <option value="QUIZZES">Quizzes</option>
          <option value="EXAMS">Exams</option>
          <option value="ASSIGNMENTS">Assignments</option>
          <option value="PROJECT">Project</option>
        </select>
        <br></br>
        <label>
          <input
            value={quiz?.shuffleAnswers}
            type="checkbox"
            checked={quiz?.shuffleAnswers}
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, shuffleAnswers: e.target.checked }))
            }
            className="me-2"
          />
          Shuffle Answers
        </label>
        <br></br>
        <label>
          Time Limit:
          <input
            value={quiz?.timeLimit}
            type="number"
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, timeLimit: e.target.checked }))
            }
            className="ms-2"
          />
        </label>{" "}
        <br></br>
        <label>
          <input
            value={quiz?.multipleAttempts}
            type="checkbox"
            checked={quiz?.multipleAttempts}
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, multipleAttempts: e.target.checked }))
            }
            className="me-2"
          />
          Multiple Attempts
        </label>
        <br></br>
        <label>
          <input
            value={quiz?.showCorrectAnswers}
            type="checkbox"
            checked={quiz?.showCorrectAnswers}
            onChange={(e) =>
              dispatch(
                setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })
              )
            }
            className="me-2"
          />
          Show Correct Answers
        </label>
        <br></br>
        <label>
          <input
            value={quiz?.oneQuestionAtATime}
            type="checkbox"
            checked={quiz?.oneQuestionAtATime}
            onChange={(e) =>
              dispatch(
                setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
              )
            }
            className="me-2"
          />
          One Question at a Time
        </label>
        <br></br>
        <label>
          <input
            value={quiz?.webcamRequired}
            type="checkbox"
            checked={quiz?.webcamRequired}
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, webcamRequired: e.target.checked }))
            }
            className="me-2"
          />
          Webcam Required
        </label>
        <br></br>
        <label>
          <input
            value={quiz?.lockQuestionsAfterAnswering}
            type="checkbox"
            checked={quiz?.lockQuestionsAfterAnswering}
            onChange={(e) =>
              dispatch(
                setQuiz({
                  ...quiz,
                  lockQuestionsAfterAnswering: e.target.checked,
                })
              )
            }
            className="me-2"
          />
          Lock Questions After Answering
        </label>
        <br></br>
        Access code:
        <input
          onChange={(e) =>
            dispatch(setQuiz({ ...quiz, accessCode: e.target.value }))
          }
          value={quiz?.accessCode}
          type="text"
          className="ms-2"
        />
        <br></br>
        <label>
          <input
            value={quiz?.dueDate?.substring(0, 10)}
            type="Date"
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, dueDate: e.target.value }))
            }
            className="me-2"
          />
          Due Date
        </label>
        <br></br>
        <label>
          <input
            value={quiz?.availableDate?.substring(0, 10)}
            type="Date"
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, availableDate: e.target.value }))
            }
            className="me-2"
          />
          Available Date
        </label>
        <br></br>
        <label>
          <input
            value={quiz?.untilDate?.substring(0, 10)}
            type="Date"
            onChange={(e) =>
              dispatch(setQuiz({ ...quiz, untilDate: e.target.value }))
            }
            className="me-2"
          />
          Until Date
        </label>
        <br></br>
      </div>
      <hr></hr>
      <button className="btn btn-primary me-2" onClick={saveQuiz}>
        Save
      </button>
      <button className="btn btn-success me-2" onClick={publishQuiz}>
        Save and Publish
      </button>
      <button className="btn btn-danger" onClick={cancelEdit}>
        Cancel
      </button>
    </>
  );
}
