import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage if available
const loadStateFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const serializedState = localStorage.getItem("kambaz_currentUser");
      if (serializedState === null) {
        return { currentUser: null };
      }
      return { currentUser: JSON.parse(serializedState) };
    } catch (err) {
      return { currentUser: null };
    }
  }
  return { currentUser: null };
};

const initialState = loadStateFromLocalStorage();

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      // Persist to localStorage
      if (typeof window !== "undefined") {
        if (action.payload) {
          localStorage.setItem("kambaz_currentUser", JSON.stringify(action.payload));
        } else {
          localStorage.removeItem("kambaz_currentUser");
        }
      }
    },
  },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;