// app/(Kambaz)/Courses/Assignments/AssignmentsControls.tsx
"use client";

import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "../Modules/GreenCheckmark";
import AssignmentEditorModal from "./AssignmentEditorModal";

export default function AssignmentsControls({
  assignmentTitle,
  setAssignmentTitle,
  addAssignment,
}: {
  assignmentTitle: string;
  setAssignmentTitle: (title: string) => void;
  addAssignment: () => void;
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-assignments-controls" className="text-nowrap mb-4">
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        onClick={handleShow}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>

      <Dropdown className="float-end me-2">
        <Dropdown.Toggle variant="secondary" size="lg">
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <GreenCheckmark /> Publish All
          </Dropdown.Item>
          <Dropdown.Item>Unpublish All</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-view-progress"
      >
        View Progress
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-collapse-all"
      >
        Collapse All
      </Button>

      <AssignmentEditorModal
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Assignment"
        assignmentTitle={assignmentTitle}
        setAssignmentTitle={setAssignmentTitle}
        addAssignment={addAssignment}
      />
    </div>
  );
}