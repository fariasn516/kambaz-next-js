import { createSlice } from "@reduxjs/toolkit";
import { assignments as initialAssignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: initialAssignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }) => {
      const newAssignment = {
        _id: payload._id || uuidv4(),
        title: payload.title || "New Assignment",
        course: payload.course,
        description: payload.description || "",
        points: payload.points || 100,
        due: payload.due || null,
        availableFrom: payload.availableFrom || null,
        availableUntil: payload.availableUntil || null,
        editing: false,
      };
      state.assignments.push(newAssignment);
    },

    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter((a) => a._id !== assignmentId);
    },

    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
    },

    updateAssignment: (state, { payload: updatedAssignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === updatedAssignment._id ? { ...a, ...updatedAssignment, editing: false } : a
      );
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  editAssignment,
  updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;