import { H } from "highlight.run";
const HIGHLIGHT_APP_ID = 'neyvmrze'

export function setupSessionRecording(labName: string) {
  H.init(HIGHLIGHT_APP_ID, {
    serviceName: labName,
  })
}