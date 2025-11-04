"use client";

import { ReactNode } from "react";
import KambazNavigation from "./Navigation";
import "./styles.css";
import store from "./store";
import { Provider } from "react-redux";

export default function KambazLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
  <Provider store={store}>
    <div className="d-flex">
      <div className="position-fixed top-0 bottom-0 start-0">
        <KambazNavigation />
      </div>

      <div className="flex-grow-1 p-3" style={{ marginLeft: "120px" }}>
        {children}
      </div>
    </div>
  </Provider>
  );
}
