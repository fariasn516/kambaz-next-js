"use client";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">
      <h2 className="mb-4">Edit Assignment</h2>
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" defaultValue="A1 - ENV + HTML" />
        </Form.Group>

        <Form.Group className="mb-4" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
- Your full name and section
- Links to each of the lab assignments
- Link to the Kanbas application
- Links to all relevant source code repositories
- Navigation back to the landing page.`}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-points">
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" defaultValue={100} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-group">
          <Form.Label>Assignment Group</Form.Label>
          <Form.Select>
            <option>ASSIGNMENTS</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-display-grade-as">
          <Form.Label>Display Grade As</Form.Label>
          <Form.Select>
            <option>Percentage</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-submission-type">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select>
            <option>Online</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Online Entry Options</Form.Label>
          <div className="ms-2">
            <Form.Check type="checkbox" label="Text Entry" id="wd-text-entry" />
            <Form.Check
              type="checkbox"
              label="Website URL"
              id="wd-website-url"
            />
            <Form.Check
              type="checkbox"
              label="Media Recordings"
              id="wd-media-recordings"
            />
            <Form.Check
              type="checkbox"
              label="Student Annotation"
              id="wd-student-annotation"
            />
            <Form.Check
              type="checkbox"
              label="File Uploads"
              id="wd-file-upload"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-assign-to">
          <Form.Label>Assign to</Form.Label>
          <Form.Control type="text" defaultValue="Everyone" />
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
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
