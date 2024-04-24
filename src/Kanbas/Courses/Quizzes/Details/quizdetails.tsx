import { quizzes } from "../../../Database";
import { Link, useParams } from "react-router-dom";

export default function QuizDetails() {
    const { courseId } = useParams();
  const Quizlist = quizzes.filter(
    (quiz) => quiz.course === courseId
  );
  const q = quizzes[1]

    return (
        <>
      <table>
        <tbody>
          <tr>
            <button>Publish</button>
            <button>Preview</button>
            <button>Edit</button>
            <hr></hr>
            <h3> QUIZ NAME </h3>
            Quiz Type {q.qtype} <br></br>
            Points {q.points} <br></br>
            Assignment Group QUIZZES <br></br>
            Shuffle Answers {q.shuffle} <br></br>
            Time Limit{q.timelimit} <br></br>
            Multiple Attempts {q.mattempts} <br></br>
            Show Correct Answers {q.showcorrect} <br></br>
            One Question at a Time {q.oneq}<br></br>
            Webcam Required {q.webcam}<br></br>
            Lock Questions After Answering {q.lock} <br></br>
          </tr>
          <tr>
            <td>Due</td>
            <td>For</td>
            <td>Available from</td>
            <td>Until</td>
          </tr>
          <hr></hr>
          <tr>
          <td>{q.duedate}</td>
          <td>Everyone</td>
          <td>{q.availabledate}</td>
          <td>{q.duedate}</td>
          </tr>
          <hr></hr>
        </tbody>
      </table>

    </>
    );
  }