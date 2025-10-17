"use client";

import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import * as db from "../../../Database";
import AssignmentControlButtons from "./AssignmentControlButtons";
import Link from "next/link";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div className="p-3">
      <ListGroup id="wd-assignments" className="rounded-0">
        {assignments
          .filter((assignment: any) => assignment.course === cid)
          .map((assignment: any) => (
            <ListGroupItem
              key={assignment._id}
              className="border-start border-5 border-success p-3 d-flex justify-content-between align-items-start"
            >
              <div>
                <div className="fw-bold text-danger fs-6 d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-5" />
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="text-danger text-decoration-none"
                  >
                    {assignment.title}
                  </Link>
                </div>
                <div className="text-muted small">
                  {assignment.description} <br />
                  <b>Due:</b> {assignment.dueDate} | {assignment.points} pts
                </div>
              </div>
              <AssignmentControlButtons />
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}