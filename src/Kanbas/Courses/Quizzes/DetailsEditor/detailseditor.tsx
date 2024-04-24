import { quizzes } from "../../../Database";
import { Link, useParams } from "react-router-dom";

export default function DetailsEditor() {
    const { courseId } = useParams();
    const Quizlist = quizzes.filter(
        (quiz) => quiz.course === courseId
    );
    const q = quizzes[1]

    return (
        <>
            <table>
                <tbody>
                    <tr></tr>
                    <hr></hr>
                    <div><input></input></div>
                    Quiz Instructions: <br></br>
                    <textarea></textarea>
                    <div>
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
                        Access Code {q.accesscode}<br></br>
                        Due Date {q.duedate}<br></br>
                        Avaliable Date {q.availabledate}<br></br>
                        Until Date {q.untildate}<br></br>
                    </div>
                    <hr></hr>
                    <button>Cancel</button>
            <button>Save & Publish</button>
            <button>Save</button>
                </tbody>
            </table>

        </>
    );
}