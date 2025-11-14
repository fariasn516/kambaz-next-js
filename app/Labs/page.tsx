import Link from "next/link";
import TOC from "./TOC";

export default function Labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <TOC />
      <p>Nancy Farias</p> 

      <ul>
        <li>
          <Link href="/Labs/Lab1" id="wd-lab1-link">
            Lab 1: HTML Examples
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab2" id="wd-lab2-link">
            Lab 2: CSS Basics
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab4" id="wd-lab4-link">
            Lab 4: React and TypeScript
          </Link>
        </li>
        <li>
          <Link href="/Labs/Lab5" id="wd-lab5-link">
            Lab 5: RESTful Web APIs
          </Link>
        </li>
      </ul>

      <Link
        href="https://github.com/fariasn516/kambaz-next-js/tree/a2"
        id="wd-github"
        target="_blank"
      >
        View GitHub Repository
      </Link>
    </div>
  );
}
