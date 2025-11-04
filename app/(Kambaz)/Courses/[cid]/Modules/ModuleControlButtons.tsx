"use client";

import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="float-end d-flex align-items-center">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3"
        role="button"
        title="Edit Module"
      />

      <FaTrash
        onClick={() => deleteModule(moduleId)}
        className="text-danger me-3"
        role="button"
        title="Delete Module"
      />

      <GreenCheckmark />

      <BsPlus className="fs-1 ms-2" role="button" title="Add Lesson" />

      <IoEllipsisVertical className="fs-4 ms-2" role="button" title="More Options" />
    </div>
  );
}