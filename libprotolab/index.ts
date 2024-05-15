import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { setLabName, labNameIsDefault } from "./lab-name"
import { setupSessionRecording } from "./highlight-io"

export function init(Lab: React.FC, labName: string) {
  setLabName(labName)

  // Initialize React
  ReactDOM.createRoot(document.getElementById("root")!).render(
    React.createElement(React.StrictMode, null, React.createElement(Lab, null))
  )

  if (labNameIsDefault()) {
    console.warn("Please set LAB_NAME in src/Lab.tsx")
  }

  if (import.meta.env.MODE === "production") {
    console.info("Session recording is enabled, recorded sessions can be viewed at https://app.highlight.io using your @code.org login.")
    setupSessionRecording(labName)
  } else {
    console.info("Session recording is disabled in development mode.")
  }
}
