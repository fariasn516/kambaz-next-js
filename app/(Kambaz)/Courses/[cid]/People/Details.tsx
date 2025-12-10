import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import * as client from "../../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails({ uid, onClose }: { uid: string | null; onClose: () => void; }) {
     const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
    // Refresh will be handled by onClose calling fetchUsers
  };
  const [user, setUser] = useState<any>({});
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);
  const saveUser = async () => {
    if (!name.trim()) {
      setEditing(false);
      return;
    }
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0] || user.firstName;
    const lastName = nameParts.slice(1).join(" ") || (nameParts.length === 1 ? "" : user.lastName);
    const updatedUser = { ...user, firstName, lastName };
    // Update UI immediately
    setUser(updatedUser);
    setEditing(false);
    // Then save to database
    await client.updateUser(updatedUser);
    onClose();
  };
  useEffect(() => {
    if (uid) {
      fetchUser();
      setEditing(false);
      setName("");
    }
  }, [uid]);
  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button onClick={onClose} className="btn position-fixed end-0 top-0 wd-close-details">
        <IoCloseSharp className="fs-1" /> </button>
      <div className="text-center mt-2"> <FaUserCircle className="text-secondary me-2 fs-1" /> </div><hr />
      <div className="text-danger fs-4 wd-name"> <div className="text-danger fs-4">
        {!editing && (
          <FaPencil onClick={() => {
            setEditing(true);
            setName(`${user.firstName} ${user.lastName}`);
          }}
              className="float-end fs-5 mt-2 wd-edit" /> )}
        {editing && (
          <FaCheck onClick={() => saveUser()}
              className="float-end fs-5 mt-2 me-2 wd-save" /> )}
        {!editing && (
          <div className="wd-name"
               onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}</div>)}
        {user && editing && (
          <FormControl className="w-50 wd-edit-name"
            value={name || `${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") { saveUser(); }
              if (e.key === "Escape") { setEditing(false); setName(""); }
            }}
            autoFocus/>)}
      </div>
 </div>
      <b>Roles:</b>           <span className="wd-roles">         {user.role}         </span> <br />
      <b>Login ID:</b>        <span className="wd-login-id">      {user.loginId}      </span> <br />
      <b>Section:</b>         <span className="wd-section">       {user.section}      </span> <br />
      <b>Total Activity:</b>  <span className="wd-total-activity">{user.totalActivity}</span> 
       <hr />
      <button onClick={() => deleteUser(uid)} className="btn btn-danger float-end wd-delete" > Delete </button>
      <button onClick={onClose}
              className="btn btn-secondary float-end me-2 wd-cancel" > Cancel </button>
      </div>
  );
}