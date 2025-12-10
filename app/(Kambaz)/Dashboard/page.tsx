"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import * as client from "../Courses/client";
import * as enrollmentsClient from "../Enrollments/client";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses
} from "../Courses/reducer";
import {
  enrollInCourse,
  unenrollFromCourse,
  setEnrollments,
} from "../Enrollments/reducer";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { RootState } from "../store";
import { setCurrentUser } from "../Account/reducer";

export default function Dashboard() {
  const dispatch = useDispatch();

const { currentUser } = useSelector(
  (state: RootState) => state.accountReducer
) as { currentUser: { _id?: string; role?: string } | null };
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { enrollments } = useSelector((state: RootState) => state.enrollmentsReducer);

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/classcover.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    if (!currentUser?._id) return;
    try {
      if (showAllCourses && isStudent) {
        // Fetch all courses when "Show All Courses" is clicked
        const courses = await client.fetchAllCourses();
        dispatch(setCourses(courses));
      } else {
        // Fetch enrolled courses (or all for faculty)
        const courses = await client.findMyCourses(currentUser._id);
        dispatch(setCourses(courses));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    if (!currentUser?._id) return;
    try {
      const enrollments = await enrollmentsClient.findEnrollmentsForCurrentUser(currentUser._id);
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
      fetchEnrollments();
    }
  }, [currentUser, showAllCourses]);


  if (!currentUser) return <div>Loading user...</div>;

  const defaultImage = "/images/classcover.jpg";
  const isFaculty = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";
  const isStudent = currentUser.role === "STUDENT";

  const isEnrolled = (courseId: string) =>
    Array.isArray(enrollments) && enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );

    const onAddNewCourse = async () => {
    try {
      await client.createCourse(course, currentUser._id);
      await fetchCourses();
      setCourse({
        _id: "0",
        name: "New Course",
        number: "New Number",
        startDate: "2023-09-10",
        endDate: "2023-12-15",
        image: "/images/classcover.jpg",
        description: "New Description",
      });
    } catch (error) {
      console.error("Failed to create course:", error);
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })));};



  return (
    <div id="wd-dashboard" className="wd-main-content-offset p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        {isStudent && (
          <button
            className="btn btn-primary"
            onClick={async () => {
              setShowAllCourses(!showAllCourses);
              // Fetch courses will happen in useEffect when showAllCourses changes
            }}
          >
            {showAllCourses ? "Show My Courses" : "Show All Courses"}
          </button>
        )}
      </div>
      <hr />

      {isFaculty && (
        <>
          <h5 id="wd-dashboard-new-course-title">
            New Course
             <button onClick={onAddNewCourse} className="btn btn-primary float-end" id="wd-add-new-course-click" >
         Add
       </button>

                  <button onClick={onUpdateCourse} className="btn btn-secondary float-end" id="wd-update-course-click" >
              Update
            </button>
          </h5>

          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />

          <hr />
        </>
      )}

      <h2>{showAllCourses ? "All Courses" : "Published Courses"} ({courses.length})</h2>
      <hr />

      <div className="row row-cols-1 row-cols-md-5 g-4">
        {courses
          .filter((course: any) => {
            if (isFaculty) return true;
            return showAllCourses || isEnrolled(course._id);
          })
          .map((course: any) => (
            <div key={course._id} className="col" style={{ width: "300px" }}>
              <Card className="text-center shadow-sm border-0 h-100">
                <CardImg
                  src={course.image || defaultImage}
                  alt={course.name}
                  style={{
                    width: "100%",
                    height: "140px",
                    objectFit: "cover",
                    borderTopLeftRadius: "0.375rem",
                    borderTopRightRadius: "0.375rem",
                  }}
                />
                <CardBody>
                  <CardTitle className="fw-bold text-primary mb-2" style={{ fontSize: "1rem" }}>
                    {course.name}
                  </CardTitle>
                  <CardText className="text-muted mb-3" style={{ height: "55px", overflow: "hidden" }}>
                    {course.description}
                  </CardText>

                  <div className="d-flex justify-content-center gap-2">
                    {(isEnrolled(course._id) || isFaculty) && (
                      <Link href={`/Courses/${course._id}/Home`}>
                        <Button variant="primary" size="sm">Go</Button>
                      </Link>
                    )}

                    {isFaculty && (
                      <>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() => setCourse(course)}
                        >
                          Edit
                        </Button>
                        <button className="btn btn-danger"
            onClick={(event) => {
              event.preventDefault();
              onDeleteCourse(course._id);
            }} >
      Delete
    </button>
                      </>
                    )}

                    {isStudent && showAllCourses && (
                      <>
                        {!isEnrolled(course._id) && (
                          <Button
                            variant="success"
                            size="sm"
                            onClick={async () => {
                              try {
                                const enrollment = await enrollmentsClient.enrollInCourse(course._id, currentUser._id!);
                                dispatch(enrollInCourse(enrollment));
                                await fetchEnrollments();
                                // If in "My Courses" view, refresh courses to show newly enrolled course
                                if (!showAllCourses) {
                                  await fetchCourses();
                                }
                              } catch (error) {
                                console.error("Failed to enroll:", error);
                              }
                            }}
                          >
                            Enroll
                          </Button>
                        )}
                        {isEnrolled(course._id) && (
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={async () => {
                              try {
                                await enrollmentsClient.unenrollFromCourse(course._id, currentUser._id!);
                                dispatch(
                                  unenrollFromCourse({
                                    userId: currentUser._id,
                                    courseId: course._id,
                                  })
                                );
                                await fetchEnrollments();
                                // If in "My Courses" view, refresh courses to hide unenrolled course
                                if (!showAllCourses) {
                                  await fetchCourses();
                                }
                              } catch (error) {
                                console.error("Failed to unenroll:", error);
                              }
                            }}
                          >
                            Unenroll
                          </Button>
                        )}
                      </>
                    )}
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}