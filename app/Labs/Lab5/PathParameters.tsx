"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");

  return (
    <div>
      <h3>Path Parameters</h3>

      <FormControl
        className="mb-2"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <FormControl
        className="mb-2"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />

      <div className="mb-2">
        <a
          className="btn btn-primary me-2"
          href={`${HTTP_SERVER}/lab5/add/${a}/${b}`}
          target="_blank"
        >
          Add {a} + {b}
        </a>

        <a
          className="btn btn-danger me-2"
          href={`${HTTP_SERVER}/lab5/subtract/${a}/${b}`}
          target="_blank"
        >
          Subtract {a} - {b}
        </a>

        <a
          className="btn btn-success me-2"
          href={`${HTTP_SERVER}/lab5/multiply/${a}/${b}`}
          target="_blank"
        >
          Multiply {a} × {b}
        </a>

        <a
          className="btn btn-warning"
          href={`${HTTP_SERVER}/lab5/divide/${a}/${b}`}
          target="_blank"
        >
          Divide {a} ÷ {b}
        </a>
      </div>
      <hr />
    </div>
  );
}
