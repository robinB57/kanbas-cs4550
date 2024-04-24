import {
  Route,
  Routes,
} from "react-router-dom";
import QuizScreen from "./Screen/screen";
import QuizDetails from "./Details/quizdetails";
import DetailsEditor from "./DetailsEditor/detailseditor";
import QuestionsEditor from "./QuestionsEditor/questionseditor";

export default function Quizzes() {
  return (
    <div>
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "70px" }}
        >
          <Routes>
            <Route path="/" element={<QuestionsEditor />} />
            <Route path="Details" element={<QuizDetails />} />
            <Route path="DetailsEditor" element={<DetailsEditor />} />
            <Route path="Preview" element={<QuizScreen />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}
