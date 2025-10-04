"use client";
import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="d-flex flex-column ps-3 mt-2">
      <Link
        href="/Account/Signin"
        className="text-dark fw-normal mb-2 text-decoration-none"
      >
        Signin
      </Link>

      <Link
        href="/Account/Signup"
        className="text-danger fw-normal mb-2 text-decoration-none"
      >
        Signup
      </Link>

      <Link
        href="/Account/Profile"
        className="text-danger fw-normal text-decoration-none"
      >
        Profile
      </Link>
    </div>
  );
}
