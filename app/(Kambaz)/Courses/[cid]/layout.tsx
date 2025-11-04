"use client";

import { ReactNode, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { FaAlignJustify } from "react-icons/fa";
import CourseNavigation from "./Navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();

  const { courses } = useSelector((state: any) => state.coursesReducer);

  const course = courses.find((course: any) => course._id === cid);

  const [showNav, setShowNav] = useState(true);

  return (
    <div id="wd-courses" className="p-3">
      <h2 className="d-flex align-items-center text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          role="button"
          onClick={() => setShowNav(!showNav)}
        />
        {course ? course.name : "Course Not Found"}
      </h2>
      <hr />

      <div className="d-flex">
        {showNav && (
          <div className="me-4 d-none d-md-block">
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}