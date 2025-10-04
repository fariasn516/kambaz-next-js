"use client";
import Link from "next/link";

export default function Signup() {
  return (
    <div
      id="wd-signup-screen"
      className="p-4 d-flex flex-column"
      style={{ maxWidth: "300px" }}
    >
      <h3 className="mb-3">Sign up</h3>

      <input
        placeholder="username"
        className="form-control mb-2"
        type="text"
      />
      <input
        placeholder="password"
        type="password"
        className="form-control mb-2"
      />
      <input
        placeholder="verify password"
        type="password"
        className="form-control mb-3"
      />

      <Link
        href="/Dashboard"
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-2 text-center"
      >
        Sign up
      </Link>

      <Link
        href="/Account/Signin"
        id="wd-signin-link"
        className="text-primary text-decoration-none text-center"
      >
        Sign in
      </Link>
    </div>
  );
}
