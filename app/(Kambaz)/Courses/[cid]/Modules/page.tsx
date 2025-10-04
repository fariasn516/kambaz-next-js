"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";

export default function Modules() {
  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <span>
              <BsGripVertical className="me-2 fs-3" />
              Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda
            </span>
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                <strong>LEARNING OBJECTIVES</strong>
              </span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                Introduction to the course
              </span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                Learn what is Web Development
              </span>
              <LessonControlButtons />
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                <strong>READING</strong>
              </span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                Full Stack Developer - Chapter 1 - Introduction
              </span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                Full Stack Developer - Chapter 2 - Creating User
              </span>
              <LessonControlButtons />
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                <strong>SLIDES</strong>
              </span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                Introduction to Web Development
              </span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                Creating an HTTP server with Node.js
              </span>
              <LessonControlButtons />
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <span>
                <BsGripVertical className="me-2 fs-3" />
                Creating a React Application
              </span>
              <LessonControlButtons />
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}