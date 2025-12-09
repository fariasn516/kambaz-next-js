import * as client from "./client";
import { useEffect, useState } from "react";
import { setCurrentUser } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
export default function Session({ children }: { children: any }) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  
  const fetchProfile = async () => {
    try {
      const user = await client.profile();
      dispatch(setCurrentUser(user));
    } catch (err: any) {
      // If profile fetch fails, user might not be logged in
      // Keep the localStorage state if it exists, otherwise clear it
      console.error(err);
      // Only clear if we're sure there's no valid session
      // The localStorage state will persist, so user stays logged in
      // until they explicitly sign out
    }
    setPending(false);
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  if (pending) {
    return null; // or a loading spinner
  }
  
  return children;
}

