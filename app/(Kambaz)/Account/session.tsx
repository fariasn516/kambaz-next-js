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
      const userId = currentUser?._id;
      const user = await client.profile(userId);
      dispatch(setCurrentUser(user));
    } catch (err: any) {
      console.error(err);
    }
    setPending(false);
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  
  if (pending) {
    return null; 
  }
  
  return children;
}

