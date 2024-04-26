import * as client from "./client";
import { setQuestionList, setQuiz, setQuizList } from "./reducer";

export function fetchQuizzes(dispatch: any, courseId: string) {
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

export function fetchQuizAndQuestions(dispatch: any, quizId: string) {
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

export function fetchEverything(
  dispatch: any,
  courseId: string,
  quizId: string
) {
  fetchQuizzes(dispatch, courseId);
  fetchQuizAndQuestions(dispatch, quizId);
}

let lastCourseId: any, lastQuizId: any;
export function fetchDataIfNeeded(
  dispatch: any,
  courseId: string | undefined,
  quizId?: string
) {
  if (courseId && courseId !== lastCourseId) {
    lastCourseId = courseId;
    fetchQuizzes(dispatch, courseId);
  }
  if (quizId && quizId !== lastQuizId) {
    lastQuizId = quizId;
    fetchQuizAndQuestions(dispatch, quizId);
  }
}
