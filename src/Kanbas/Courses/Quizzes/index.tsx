import { Route, Routes } from "react-router-dom";
import QuizPreview from "./QuizPreview/QuizPreview";
import QuestionEditor from "./QuestionEditor/QuestionEditor";

import QuizList from "./QuizList";
import QuizEditor from "./QuizEditor";
import QuizDetails from "./QuizDetails";
import QuestionList from "./QuestionList";

export default function Quizzes() {
  return (
    <Routes>
      <Route path="/" element={<QuizList />} />
      <Route path=":quizId/details" element={<QuizDetails />} />
      <Route path=":quizId/edit" element={<QuizEditor />} />
      <Route path=":quizId/edit/questions" element={<QuestionList />} />
      <Route
        path=":quizId/edit/questions/:questionId"
        element={<QuestionEditor />}
      />
      <Route path=":quizId/preview" element={<QuizPreview />} />
    </Routes>
  );
}
