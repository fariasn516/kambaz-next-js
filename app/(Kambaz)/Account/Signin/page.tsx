"use client";
import Link from "next/link";

export default function Signin() {
  return (
    <div
      id="wd-signin-screen"
      className="p-4 d-flex flex-column"
      style={{ maxWidth: "300px" }}
    >
      <h3 className="mb-3">Sign in</h3>

      <input
        type="text"
        placeholder="username"
        className="form-control mb-2"
      />

      <input
        type="password"
        placeholder="password"
        className="form-control mb-3"
      />

      <Link
        id="wd-signin-btn"
        href="/Dashboard"
        className="btn btn-primary w-100 mb-2 text-center"
      >
        Sign in
      </Link>

      <Link
        href="/Account/Signup"
        id="wd-signup-link"
        className="text-primary text-decoration-none text-center"
      >
        Sign up
      </Link>
    </div>
  );
}
