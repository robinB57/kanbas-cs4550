import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizList: [] as any[],
  quiz: undefined as any,
  questionList: [] as any[],
  question: undefined as any,
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizList: (state, action) => {
      state.quizList = action.payload;
    },
    setQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    setQuestionList: (state, action) => {
      state.questionList = action.payload;
    },
    addQuiz: (state, action) => {
      state.quizList.push(action.payload);
    },
    addQuestion: (state, action) => {
      state.questionList.push(action.payload);
    },
    deleteQuestion: (state, action) => {
      state.questionList = state.questionList.filter(
        (q) => q._id !== action.payload
      );
    },
  },
});

export const {
  setQuizList,
  setQuiz,
  setQuestionList,
  addQuiz,
  addQuestion,
  deleteQuestion,
} = quizzesSlice.actions;
export default quizzesSlice.reducer;
