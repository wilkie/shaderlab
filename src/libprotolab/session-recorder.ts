import { eventWithTime } from '@rrweb/types';
import * as rrweb from 'rrweb'
import 'rrweb/dist/rrweb.css'
import React from "react";

const recordedEvents: eventWithTime[] = []

export function record() {
  rrweb.record({
    emit(event) {
      recordedEvents.push(event)
    },
  });

}

const randomString = () => {
  return Math.random().toString(36).substring(2, 8);
}

export function downloadRecording() {
  const filename = `protolab-session-${randomString()}.json`

  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(recordedEvents))
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute("href", dataStr)
  downloadAnchorNode.setAttribute("download", filename)
  document.body.appendChild(downloadAnchorNode)
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

export const DownloadRecordingLink = () =>
  React.createElement(
    "a",
    {
      href: "#",
      onClick: (e) => {
        e.preventDefault()
        downloadRecording()
      },
    },
    "Download Recording"
  )

export function replay(events: eventWithTime[]) {
  const replayer = new rrweb.Replayer(events)
  replayer.play()
}
