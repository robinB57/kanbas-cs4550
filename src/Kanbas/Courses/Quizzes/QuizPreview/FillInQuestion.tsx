import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { KanbasState } from "../../../store";
import { useState } from "react";
import * as client from "../client";
import { setQuestionList } from "../reducer";
import { Editor } from "@tinymce/tinymce-react";
import { TINYMCE_API_KEY } from "../../../../constants";

export default function FillInQuestion() {
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
      Answers:
      <ul className="list-group">
        {question.fillInBlanksAnswers
          .sort((question: any) => question.order)
          .map((answer: any, index: number) => (
            <li className="list-group-item">
              <input value={question.title} type="text" />
            </li>
          ))}
      </ul>
    </>
  );
}
