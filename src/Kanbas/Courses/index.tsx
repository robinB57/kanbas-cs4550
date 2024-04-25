import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { HiMiniBars3 } from "react-icons/hi2";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import { useEffect, useState } from "react";
import axios from "axios";
import { COURSES_API } from "../../constants";
import Quizzes from "./Quizzes";

export default function Courses() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>({ _id: "" });
  const findCourseById = async (courseId?: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}`);
    setCourse(response.data);
  };

  useEffect(() => {
    findCourseById(courseId);
  }, [courseId]);

  const { pathname } = useLocation();
  const breadcrumbs = pathname.split("/").slice(4);

  return (
    <div>
      <h1>
        <HiMiniBars3 /> {course?.name}
        {breadcrumbs.map((crumb) => " > " + crumb)}
      </h1>
      <hr />
      <CourseNavigation />
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0 mt-4"
          style={{ left: "320px", top: "70px" }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:assignmentId"
              element={<h1>Assignment Editor</h1>}
            />
            <Route path="Grades" element={<h1>Grades</h1>} />
            <Route path="Quizzes/*" element={<Quizzes />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
