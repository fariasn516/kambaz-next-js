"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [moduleObject, setModuleObject] = useState({
    id: "M101",
    name: "Intro to Express",
    description: "Learn Express routing and middleware",
    course: "CS4550",
  });

  const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;
  const MODULE_API = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Retrieving Objects</h4>
      <a className="btn btn-primary mb-2" href={ASSIGNMENT_API}>
        Get Assignment
      </a>

      <h4>Retrieving Properties</h4>
      <a className="btn btn-secondary mb-2" href={`${ASSIGNMENT_API}/title`}>
        Get Title
      </a>

      <hr />

      <h4>Modifying Assignment</h4>

      <a
        className="btn btn-success float-end"
        href={`${ASSIGNMENT_API}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl
        className="mb-2 w-75"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      <a
        className="btn btn-warning float-end"
        href={`${ASSIGNMENT_API}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <FormControl
        className="mb-2 w-75"
        type="number"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })
        }
      />

      <a
        className="btn btn-danger float-end"
        href={`${ASSIGNMENT_API}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>
      <input
        type="checkbox"
        className="form-check-input mb-2"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />

      <hr />

      <h3>Module Object</h3>

      <a className="btn btn-primary mb-2" href={MODULE_API}>
        Get Module
      </a>

      <a className="btn btn-secondary mb-2" href={`${MODULE_API}/name`}>
        Get Module Name
      </a>

      <a
        className="btn btn-success float-end"
        href={`${MODULE_API}/name/${moduleObject.name}`}
      >
        Update Name
      </a>
      <FormControl
        className="mb-2 w-75"
        defaultValue={moduleObject.name}
        onChange={(e) =>
          setModuleObject({ ...moduleObject, name: e.target.value })
        }
      />

      <a
        className="btn btn-warning float-end"
        href={`${MODULE_API}/description/${moduleObject.description}`}
      >
        Update Description
      </a>
      <FormControl
        className="mb-2 w-75"
        defaultValue={moduleObject.description}
        onChange={(e) =>
          setModuleObject({
            ...moduleObject,
            description: e.target.value,
          })
        }
      />

      <hr />
    </div>
  );
}
