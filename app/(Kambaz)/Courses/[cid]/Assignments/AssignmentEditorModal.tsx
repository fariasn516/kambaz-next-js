// app/(Kambaz)/Courses/Assignments/AssignmentEditorModal.tsx
"use client";

import { Modal, FormControl, Button } from "react-bootstrap";

export default function AssignmentEditorModal({
  show,
  handleClose,
  dialogTitle,
  assignmentTitle,
  setAssignmentTitle,
  addAssignment,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  assignmentTitle: string;
  setAssignmentTitle: (name: string) => void;
  addAssignment: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          value={assignmentTitle}
          onChange={(e) => setAssignmentTitle(e.target.value)}
          placeholder="Enter Assignment Title"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            addAssignment();
            handleClose();
          }}
        >
          Add Assignment
        </Button>
      </Modal.Footer>
    </Modal>
  );
}