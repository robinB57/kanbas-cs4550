import { Link, useLocation } from "react-router-dom";
import "./index.css";

export default function CourseNavigation() {
  const links = ["Home", "Modules", "Grades", "Assignments", "Quizzes"];
  const { pathname } = useLocation();
  return (
    <ul className="wd-navigation">
      {links.map((link, index) => (
        <li key={index} className={pathname.includes(link) ? "wd-active" : ""}>
          <Link to={link}>{link}</Link>
        </li>
      ))}
    </ul>
  );
}
