"use client";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { useRouter } from "next/navigation";
import * as client from "../client";

export default function Signup() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "", verify: "" });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const signup = async () => {
    setError("");
    if (user.password !== user.verify) {
      setError("Passwords do not match");
      return;
    }
    try {
      const newUser = await client.signup({
        username: user.username,
        password: user.password,
      });
      dispatch(setCurrentUser(newUser));
      router.push("/Account/Profile");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div
      id="wd-signup-screen"
      className="p-4 d-flex flex-column"
      style={{ maxWidth: "300px" }}
    >
      <h3 className="mb-3">Sign up</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        placeholder="username"
        className="form-control mb-2"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        placeholder="password"
        type="password"
        className="form-control mb-2"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <input
        placeholder="verify password"
        type="password"
        className="form-control mb-3"
        value={user.verify}
        onChange={(e) => setUser({ ...user, verify: e.target.value })}
      />

      <button
        onClick={signup}
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-2 text-center"
      >
        Sign up
      </button>

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
