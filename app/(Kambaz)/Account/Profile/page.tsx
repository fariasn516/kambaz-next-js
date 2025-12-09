"use client";
import { redirect } from "next/dist/client/components/navigation";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { RootState } from "../../store";
import { Button, FormControl } from "react-bootstrap";
import * as client from "../client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const fetchProfile = () => {
    if (!currentUser) return redirect("/Account/Signin");
    setProfile(currentUser);
  };

  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    redirect("/Account/Signin");
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="wd-profile-screen">
      <h3>Profile</h3>
      {profile && (
        <div>
          <FormControl
            id="wd-username"
            className="mb-2"
            placeholder="Username"
            value={profile.username || ""}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
          />
          <FormControl
            id="wd-password"
            type="password"
            className="mb-2"
            placeholder="Password"
            value={profile.password || ""}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <FormControl
            id="wd-firstname"
            className="mb-2"
            placeholder="First Name"
            value={profile.firstName || ""}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
          />
          <FormControl
            id="wd-lastname"
            className="mb-2"
            placeholder="Last Name"
            value={profile.lastName || ""}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
          />
          <FormControl
            id="wd-dob"
            type="date"
            className="mb-2"
            placeholder="Date of Birth"
            value={profile.dob || ""}
            onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
          />
          <FormControl
            id="wd-email"
            type="email"
            className="mb-2"
            placeholder="Email"
            value={profile.email || ""}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <select
            id="wd-role"
            className="form-control mb-2"
            value={profile.role || "USER"}
            onChange={(e) => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          <Button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
            Update
          </Button>
          <Button onClick={signout} className="btn btn-danger w-100" id="wd-signout-btn">
            Sign out
          </Button>
        </div>
      )}
    </div>
  );
}