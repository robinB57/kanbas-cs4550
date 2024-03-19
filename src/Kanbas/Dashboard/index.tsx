import { Link } from "react-router-dom";
import { courses } from "../Database";

export default function Dashboard() {
  return (
    <div className="p-4">
      <h1>Dashboard</h1>
      <hr />
      <h2>Published Courses (7)</h2>
      <hr />
      <div className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div key={course._id} className="col" style={{ width: 300 }}>
              <div className="card">
                <img
                  src={`/images/${course.image}`}
                  alt=""
                  className="card-img-top"
                  style={{ height: 150 }}
                />
                <div className="card-body" style={{ height: 80 }}>
                  <Link
                    className="card-title"
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    style={{
                      textDecoration: "none",
                      color: "navy",
                      fontWeight: "bold",
                    }}
                  >
                    {course.number + " " + course.name}
                  </Link>
                  <p className="card-text"></p>
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="stretched-link"
                  ></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
