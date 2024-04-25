import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { KanbasState } from "../../store";
import { useEffect, useState } from "react";
import * as client from "./client";

export default function QuizPreview() {
  const { quizId } = useParams();
  const quiz = useSelector((state: KanbasState) => state.quizzesReducer.quiz);
  const [questions, setQuestions] = useState([] as any[]);

  useEffect(() => {
    Promise.all(
      quiz.questions.map((questionId: string) =>
        client.findQuestion(quizId as string, questionId)
      )
    ).then((questionObjects: any[]) => {
      setQuestions(questionObjects.sort((question) => question.order));
    });
  }, [quiz, quizId]);

  return (
    <>
      <table>
        <tbody></tbody>
      </table>
    </>
  );
}
