import CoursesDao from "./dao.js";
import EnrollmentsDao from "../Enrollments/dao.js";

export default function CourseRoutes(app, db) {
  const dao = CoursesDao(db);
  const findAllCourses = (req, res) => {
    const courses = dao.findAllCourses();
    res.send(courses);
  }

  const findCoursesForEnrolledUser = (req, res) => {
    let { userId } = req.params;
    let user = null;
    if (userId === "current") {
      user = req.session["currentUser"];
      if (!user) {
        res.sendStatus(401);
        return;
      }
      userId = user._id;
    } else {
      // Look up user by ID if not "current"
      const { users } = db;
      user = users.find((u) => u._id === userId);
    }
    // If user is ADMIN or FACULTY, return all courses
    if (user && (user.role === "ADMIN" || user.role === "FACULTY")) {
      const courses = dao.findAllCourses();
      res.json(courses);
      return;
    }
    const courses = dao.findCoursesForEnrolledUser(userId);
    res.json(courses);
  };

  const enrollmentsDao = EnrollmentsDao(db);
  const createCourse = (req, res) => {
    const currentUser = req.session["currentUser"];
    const newCourse = dao.createCourse(req.body);
    enrollmentsDao.enrollUserInCourse(currentUser._id, newCourse._id);
    res.json(newCourse);
  };

  const deleteCourse = (req, res) => {
    const { courseId } = req.params;
    const status = dao.deleteCourse(courseId);
    res.send(status);
  }
  
  const updateCourse = (req, res) => {
    const { courseId } = req.params;
    const courseUpdates = req.body;
    const status = dao.updateCourse(courseId, courseUpdates);
    res.send(status);
  }
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
  app.post("/api/users/current/courses", createCourse);
  app.get("/api/users/:userId/courses", findCoursesForEnrolledUser);
  app.get("/api/courses", findAllCourses);
}
