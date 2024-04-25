import { Navigate, Route, Routes } from "react-router-dom";
import "./styles.css";
import KanbasNavigation from "./Navigation";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";
import { COURSES_API } from "../constants";
import Account from "./Account";

const DEFAULT_COURSE = {
  _id: -1,
  name: "New Course",
  number: "TEST1234",
  startDate: "2023-09-10",
  endDate: "2023-12-15",
  image: "/classes/black-class.png",
};

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState(DEFAULT_COURSE);
  const getAllCourses = async () => {
    const response = await axios.get(COURSES_API);
    setCourses(response.data);
  };
  const addNewCourse = async () => {
    const response = await axios.post(COURSES_API, course);
    const newCourse = response.data;
    setCourses([...courses, newCourse]);
    setCourse(DEFAULT_COURSE);
  };
  const deleteCourse = async (courseId: string) => {
    await axios.delete(`${COURSES_API}/${courseId}`);
    setCourses(courses.filter((c) => c._id !== courseId));
  };
  const updateCourse = async () => {
    await axios.put(`${COURSES_API}/${course._id}`, course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        }
        return c;
      })
    );
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <Provider store={store}>
      <div className="d-flex w-100 h-100 overflow-hidden">
        <KanbasNavigation />
        <div style={{ flexGrow: 1 }} className="container-fluid p-4">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <Dashboard
                  courses={courses}
                  course={course}
                  setCourse={setCourse}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                />
              }
            />
            <Route path="/Courses/:courseId/*" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}
