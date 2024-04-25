import { Link } from "react-router-dom";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  return (
    <div className="h-100 overflow-scroll">
      <h1>Dashboard</h1>
      <h5>Course</h5>
      <input
        value={course.name}
        className="form-control"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <input
        value={course.number}
        className="form-control"
        onChange={(e) => setCourse({ ...course, number: e.target.value })}
      />
      <input
        value={course.startDate}
        className="form-control"
        type="date"
        onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
      />
      <input
        value={course.endDate}
        className="form-control"
        type="date"
        onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
      />
      <button onClick={addNewCourse} className="btn btn-primary me-2">
        Add
      </button>
      <button onClick={updateCourse} className="btn btn-warning">
        Update
      </button>

      <hr />
      <h2>Published Courses ({courses.length})</h2>
      <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">
                <Link
                  className="card-title"
                  to={`/Kanbas/Courses/${course._id}/Home`}
                  style={{
                    textDecoration: "none",
                    color: "navy",
                    fontWeight: "bold",
                  }}
                >
                  <div style={{ height: 150 }}>
                    <img
                      src={`/images${course.image}`}
                      alt=""
                      className="card-img-top"
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                      }}
                    >
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-light"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                        className="btn btn-light"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="card-body" style={{ height: 80 }}>
                    {course.number + " " + course.name}{" "}
                    <p className="card-text"></p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
