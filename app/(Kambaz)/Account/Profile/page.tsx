"use client";
import Link from "next/link";

export default function Profile() {
  return (
    <div
      id="wd-profile-screen"
      className="p-4 d-flex flex-column"
      style={{ maxWidth: "320px" }}
    >
      <h3 className="mb-3">Profile</h3>

      <input
        defaultValue="alice"
        placeholder="username"
        className="form-control mb-2"
      />

      <input
        defaultValue="123"
        placeholder="password"
        type="password"
        className="form-control mb-2"
      />

      <input
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
        className="form-control mb-2"
      />

      <input
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
        className="form-control mb-2"
      />

      <input
        defaultValue="2000-01-01"
        type="date"
        id="wd-dob"
        className="form-control mb-2"
      />

      <input
        defaultValue="alice@wonderland.com"
        type="email"
        id="wd-email"
        className="form-control mb-2"
      />

      <select defaultValue="USER" id="wd-role" className="form-control mb-3">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>

      <Link
        href="/Signin"
        id="wd-signout-link"
        className="btn btn-danger w-100"
      >
        Signout
      </Link>
    </div>
  );
}