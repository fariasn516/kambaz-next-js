"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const pathname = usePathname();

  const baseLinks = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <Nav variant="pills">
      {baseLinks.map((link) => (
        <NavItem key={link}>
          <NavLink
            as={Link}
            href={`/${link}`}
            active={pathname.endsWith(link.toLowerCase())}
          >
            {link}
          </NavLink>
        </NavItem>
      ))}

      {currentUser?.role === "ADMIN" && (
        <NavItem>
          <NavLink
            as={Link}
            href="/Account/Users"
            active={pathname.endsWith("Users")}
          >
            Users
          </NavLink>
        </NavItem>
      )}
    </Nav>
  );
}