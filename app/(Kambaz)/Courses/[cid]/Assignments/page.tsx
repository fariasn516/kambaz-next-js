"use client";
import { ListGroup, ListGroupItem, Button, InputGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus, FaSearch } from "react-icons/fa";
import AssignmentControlButtons from "./AssignmentControlButtons";
import Link from "next/link";

export default function Assignments() {
  return (
    <div className="p-3">
      <div className="mb-4 clearfix">
        <Button
          variant="danger"
          size="lg"
          className="float-end ms-2"
          id="wd-add-assignment-btn"
        >
          <FaPlus className="me-2" />
          Assignment
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="float-end"
          id="wd-add-group-btn"
        >
          <FaPlus className="me-2" />
          Group
        </Button>

        <InputGroup className="w-50">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search for Assignments" />
        </InputGroup>
      </div>

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="bg-light p-3 d-flex align-items-center justify-content-between fs-5 border border-1">
          <span>
            <BsGripVertical className="me-2 fs-4" />
            ASSIGNMENTS 40% of Total
          </span>
          <Button variant="light" className="border rounded p-1">
            <FaPlus />
          </Button>
        </ListGroupItem>

        <ListGroupItem className="border-start border-5 border-success p-3 d-flex justify-content-between align-items-start">
          <div>
            <div className="fw-bold text-danger fs-6 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-5" />
              <Link href="/Courses/1234/Assignments/123" className="text-danger text-decoration-none">
                A1 – ENV + HTML
              </Link>
            </div>
            <div className="text-muted small">
              Multiple Modules | <b>Not available until</b> May 6 at 12:00am <br />
              <b>Due</b> May 13 at 11:59pm | 100 pts
            </div>
          </div>
          <AssignmentControlButtons />
        </ListGroupItem>

        <ListGroupItem className="border-start border-5 border-success p-3 d-flex justify-content-between align-items-start">
          <div>
            <div className="fw-bold text-danger fs-6 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-5" />
              <Link href="/Courses/1234/Assignments/123" className="text-danger text-decoration-none">
                A2 – CSS + BOOTSTRAP
              </Link>
            </div>
            <div className="text-muted small">
              Multiple Modules | <b>Not available until</b> May 13 at 12:00am <br />
              <b>Due</b> May 20 at 11:59pm | 100 pts
            </div>
          </div>
          <AssignmentControlButtons />
        </ListGroupItem>

        <ListGroupItem className="border-start border-5 border-success p-3 d-flex justify-content-between align-items-start">
          <div>
            <div className="fw-bold text-danger fs-6 d-flex align-items-center">
              <BsGripVertical className="me-2 fs-5" />
              <Link href="/Courses/1234/Assignments/123" className="text-danger text-decoration-none">
                A3 – JAVASCRIPT + REACT
              </Link>
            </div>
            <div className="text-muted small">
              Multiple Modules | <b>Not available until</b> May 20 at 12:00am <br />
              <b>Due</b> May 27 at 11:59pm | 100 pts
            </div>
          </div>
          <AssignmentControlButtons />
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
