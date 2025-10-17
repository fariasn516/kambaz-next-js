"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as db from "../../../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = db.assignments || [];

  const assignment = assignments.find((a: any) => a._id === aid);

  if (!assignment) {
    return (
      <div className="p-4">
        <h2>Assignment not found</h2>
        <Link href={`/Courses/${cid}/Assignments`}>
          <Button variant="secondary" className="mt-3">
            Back to Assignments
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div id="wd-assignments-editor" className="p-4">
      <h2 className="mb-4">{assignment.title}</h2>

      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue={assignment.title} />
        </Form.Group>

        <Form.Group className="mb-4" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            defaultValue={`Edit the assignment details for ${assignment.title}.`}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" defaultValue={100} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-group">
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select defaultValue="ASSIGNMENTS">
            <option>ASSIGNMENTS</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-display-grade-as">
          <Form.Label>Display Grade As</Form.Label>
          <Form.Select defaultValue="Percentage">
            <option>Percentage</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-submission-type">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select defaultValue="Online">
            <option>Online</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Online Entry Options</Form.Label>
          <div className="ms-2">
            <Form.Check type="checkbox" label="Text Entry" />
            <Form.Check type="checkbox" label="Website URL" />
            <Form.Check type="checkbox" label="Media Recordings" />
            <Form.Check type="checkbox" label="Student Annotation" />
            <Form.Check type="checkbox" label="File Uploads" />
          </div>
        </Form.Group>

        <Row className="mb-4">
          <Col md={4}>
            <Form.Group controlId="wd-due-date">
              <Form.Label>Due</Form.Label>
              <Form.Control type="date" defaultValue="2024-05-13" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-available-from">
              <Form.Label>Available From</Form.Label>
              <Form.Control type="date" defaultValue="2024-05-06" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-available-until">
              <Form.Label>Until</Form.Label>
              <Form.Control type="date" defaultValue="2024-05-20" />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Link href={`/Courses/${cid}/Assignments`}>
            <Button variant="danger">Save</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}
