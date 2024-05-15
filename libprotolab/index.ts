import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { setLabName, labNameIsDefault } from "./lab-name";

export function init(Lab: React.FC, labName: string) {
  setLabName(labName)

  // Initialize React
  ReactDOM.createRoot(document.getElementById("root")!).render(
    React.createElement(React.StrictMode, null, React.createElement(Lab, null))
  )

  if (labNameIsDefault()) {
    console.warn("Please set LAB_NAME in src/Lab.tsx")
  }
}
