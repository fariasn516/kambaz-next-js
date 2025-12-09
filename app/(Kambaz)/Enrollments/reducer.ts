import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollInCourse: (state, { payload: enrollment }) => {
      const alreadyEnrolled = state.enrollments.some(
        (e: any) => e.user === enrollment.user && e.course === enrollment.course
      );
      if (!alreadyEnrolled) {
        state.enrollments.push(enrollment);
      }
    },
    unenrollFromCourse: (state, { payload: { userId, courseId } }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) => !(e.user === userId && e.course === courseId)
      );
    },
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
    },
  },
});

export const { enrollInCourse, unenrollFromCourse, setEnrollments } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;