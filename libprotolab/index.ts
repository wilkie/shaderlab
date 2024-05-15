import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"

export function init(Lab: React.FC, labName: string) {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    React.createElement(React.StrictMode, null, React.createElement(Lab, null))
  )
}
