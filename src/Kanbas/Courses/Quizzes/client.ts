import axios from "axios";
import { QUIZZES_API } from "../../../constants";

// Quiz functions
export const createQuiz = async (courseId: string) => {
  const response = await axios.post(`${QUIZZES_API}/`, { course: courseId });
  return response.data;
};
export const findQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}`);
  return response.data;
};
export const findAllQuizzes = async () => {
  const response = await axios.get(`${QUIZZES_API}`);
  return response.data;
};
export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};
export const deleteQuiz = async (quizId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

// Question functions
export const createQuestion = async (quizId: string) => {
  const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, {
    quiz: quizId,
  });
  return response.data;
};
export const findQuestion = async (quizId: string, questionId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};
export const findQuestionsForQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return response.data;
};
export const updateQuestion = async (question: any) => {
  const response = await axios.put(`${QUIZZES_API}/${question._id}`, question);
  return response.data;
};
export const deleteQuestion = async (questionId: string) => {
  const response = await axios.delete(`${QUIZZES_API}/${questionId}`);
  return response.data;
};
