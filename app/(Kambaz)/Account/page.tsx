"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { redirect } from "next/dist/client/components/navigation";
export default function Account() {
 const { currentUser } = useSelector((state: RootState) => state.accountReducer);
 if (!currentUser) {
   redirect("/Account/Signin");
 } else {
   redirect("/Account/Profile");
 }
 
 return null;
}