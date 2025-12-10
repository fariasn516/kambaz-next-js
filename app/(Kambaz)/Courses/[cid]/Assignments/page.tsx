"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

import {
  addAssignment,
  editAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignments,
} from "./reducer";
import { RootState } from "../../../store";
import * as client from "../../client";

import AssignmentControlButtons from "./AssignmentControlButtons";
import AssignmentsControls from "./AssignmentControls";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const [assignmentTitle, setAssignmentTitle] = useState("");

  const assignments = useSelector(
    (state: RootState) => state.assignmentsReducer.assignments
  );

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as { role?: string } | null;

  const isFacultyOrTA =
    currentUser?.role === "FACULTY" || currentUser?.role === "TA" || currentUser?.role === "ADMIN";

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!cid) return;
      try {
        const assignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(Array.isArray(assignments) ? assignments : []));
      } catch (error) {
        console.error("Error fetching assignments:", error);
        dispatch(setAssignments([]));
      }
    };
    fetchAssignments();
  }, [cid, dispatch]);

  const handleAddAssignment = async () => {
    if (!assignmentTitle.trim() || !cid) return;
    try {
      const newAssignment = {
        title: assignmentTitle,
        course: cid as string,
        due: new Date().toISOString().slice(0, 10),
        points: 100,
        description: "",
      };
      const assignment = await client.createAssignmentForCourse(cid as string, newAssignment);
      dispatch(addAssignment(assignment));
      setAssignmentTitle("");
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      await client.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const handleUpdateAssignment = async (assignment: any) => {
    try {
      const updatedAssignment = await client.updateAssignment(assignment);
      dispatch(updateAssignment(updatedAssignment || assignment));
    } catch (error) {
      console.error("Error updating assignment:", error);
      // Still update UI optimistically
      dispatch(updateAssignment(assignment));
    }
  };

  return (
    <div className="wd-assignments">
      {isFacultyOrTA && (
        <div className="d-flex justify-content-end align-items-center mb-3">
          <AssignmentsControls
            assignmentTitle={assignmentTitle}
            setAssignmentTitle={setAssignmentTitle}
            addAssignment={handleAddAssignment}
          />
        </div>
      )}

      <ListGroup id="wd-assignments" className="rounded-0">
        {assignments.map((assignment) => (
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
                      value={assignment.title || ""}
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
                          handleUpdateAssignment({ ...assignment, editing: false });
                        }
                        if (e.key === "Escape") {
                          dispatch(updateAssignment({ ...assignment, editing: false }));
                        }
                      }}
                    />
                  )}
                </div>

                {isFacultyOrTA && (
                  <AssignmentControlButtons
                    assignmentId={assignment._id}
                    editAssignment={(id) => dispatch(editAssignment(id))}
                    deleteAssignment={handleDeleteAssignment}
                  />
                )}
              </div>

              <ListGroup className="rounded-0">
                <ListGroupItem className="p-3 ps-4 d-flex justify-content-between text-muted">
                  <span>
                    <strong>Available From:</strong>{" "}
                    {assignment.availableFrom
                      ? new Date(assignment.availableFrom).toLocaleDateString()
                      : "N/A"}{" "}
                    | <strong>Due:</strong>{" "}
                    {assignment.due
                      ? new Date(assignment.due).toLocaleString()
                      : "N/A"}
                  </span>
                  <span>
                    <strong>{assignment.points ?? 100} pts</strong>
                  </span>
                </ListGroupItem>
              </ListGroup>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}