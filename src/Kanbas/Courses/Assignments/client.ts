import axios from "axios";

const COURSES_API =
  "https://kanbas-node-server-cs4550.onrender.com/api/courses";
const ASSIGNMENTS_API =
  "https://kanbas-node-server-cs4550.onrender.com/api/assignments";

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createAssignment = async (
  courseId: string,
  assignment: object
) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/assignments`,
    assignment
  );
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const response = await axios.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    module
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};
