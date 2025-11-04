"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  editAssignment,
  deleteAssignment,
  updateAssignment,
} from "./reducer";
import { RootState } from "../../../store";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentControls";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [assignmentTitle, setAssignmentTitle] = useState("");

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const { currentUser } = useSelector(
  (state: RootState) => state.accountReducer
) as { currentUser: { role?: string } | null };

const isFacultyOrTA = currentUser?.role === "FACULTY" || currentUser?.role === "TA";

  return (
    <div className="wd-assignments">
      {isFacultyOrTA && (
        <div className="d-flex justify-content-end align-items-center">
          <AssignmentsControls
            assignmentTitle={assignmentTitle}
            setAssignmentTitle={setAssignmentTitle}
            addAssignment={() => {
              if (!assignmentTitle.trim()) return;
              dispatch(
                addAssignment({
                  _id: uuidv4(),
                  title: assignmentTitle,
                  course: cid,
                  due: new Date().toISOString().slice(0, 10),
                })
              );
              setAssignmentTitle("");
            }}
          />
        </div>
      )}

      <ListGroup id="wd-assignments" className="rounded-0">
        {assignments
          .filter((a: any) => a.course === cid)
          .map((assignment: any) => (
            <ListGroupItem
              key={assignment._id}
              className="wd-assignment p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between text-white">
                <div className="d-flex align-items-center w-100">
                  <BsGripVertical className="me-2 fs-3" />

                  {!assignment.editing && (
                    <Link
                      href={`/Courses/${cid}/Assignments/${assignment._id}`}
                      className="text-white text-decoration-none"
                    >
                      {assignment.title}
                    </Link>
                  )}

                  {isFacultyOrTA && assignment.editing && (
                    <FormControl
                      className="w-50 d-inline-block"
                      autoFocus
                      defaultValue={assignment.title}
                      onChange={(e) =>
                        dispatch(
                          updateAssignment({
                            ...assignment,
                            title: (e.target as HTMLInputElement).value,
                          })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(
                            updateAssignment({
                              ...assignment,
                              editing: false,
                            })
                          );
                        }
                      }}
                    />
                  )}
                </div>

                {isFacultyOrTA && (
                  <AssignmentControlButtons
                    assignmentId={assignment._id}
                    editAssignment={(id) => dispatch(editAssignment(id))}
                    deleteAssignment={(id) => dispatch(deleteAssignment(id))}
                  />
                )}
              </div>

              <ListGroup className="rounded-0">
                <ListGroupItem className="p-3 ps-4 d-flex justify-content-between text-muted">
                  <span>
                    <strong>Available From:</strong>{" "}
                    {assignment.availableFrom
                      ? new Date(assignment.availableFrom).toLocaleDateString()
                      : "N/A"}
                    {" | "}
                    <strong>Due:</strong>{" "}
                    {assignment.due
                      ? new Date(assignment.due).toLocaleString()
                      : "N/A"}
                  </span>
                  <span>
                    <strong>{assignment.points || 100} pts</strong>
                  </span>
                </ListGroupItem>
              </ListGroup>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}