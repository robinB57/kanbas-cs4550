import * as client from "./client";
import { setQuestionList, setQuiz, setQuizList } from "./reducer";

let lastCourseId: any, lastQuizId: any;
export function fetchData(
  dispatch: any,
  courseId: string | undefined,
  quizId?: string
) {
  if (courseId && courseId !== lastCourseId) {
    lastCourseId = courseId;
    client.findAllQuizzes().then((allQuizzes) =>
      dispatch(
        setQuizList(
          allQuizzes.filter((quiz: any) => {
            return quiz.course === courseId;
          })
        )
      )
    );
  }
  if (quizId && quizId !== lastQuizId) {
    lastQuizId = quizId;
    client
      .findQuiz(quizId)
      .then((newQuiz) => {
        dispatch(setQuiz(newQuiz));
      })
      .then(() =>
        client
          .findQuestionsForQuiz(quizId)
          .then((questions) => dispatch(setQuestionList(questions)))
      );
  }
}
