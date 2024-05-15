import React from 'react'
import ReactDOM from 'react-dom/client'
import Lab from './Lab.tsx'
import './index.css'
import {record} from './libprotolab/session-recorder.ts'

record();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Lab/>
  </React.StrictMode>
);
