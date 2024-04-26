import { useParams } from "react-router-dom";
import * as client from "../client";
import { TINYMCE_API_KEY } from "../../../../constants";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, useSelector } from "react-redux";
import { KanbasState } from "../../../store";
import { useState } from "react";
import { setQuestionList } from "../reducer";

export default function MCQuestion() {
  const { questionId } = useParams();
  const dispatch = useDispatch();
  const questionList = useSelector(
    (state: KanbasState) => state.quizzesReducer.questionList
  );
  const [question, setQuestion] = useState(
    questionList?.find((q) => q._id === questionId)
  );

  return (
    <>
      {question.title} : {question.points} Points <hr></hr>
      {question.text}
      Answers:
      <ul className="list-group">
        {question.multipleChoiceAnswers
          .sort((question: any) => question.order)
          .map((answer: any, index: number) => (
            <li className="list-group-item">{answer.answerText}</li>
          ))}
      </ul>
    </>
  );
}
