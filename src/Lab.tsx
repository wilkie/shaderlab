import {CodeOrg, BlockWorkspace, Header, Output} from '../libprotolab/layout/CodeOrg'
import {toolbox} from './toolbox'
import { DownloadRecordingLink } from '../libprotolab/session-recorder'

export const LAB_NAME = "Protolab"

function Toolbar() {
  return (
    <span>
      <DownloadRecordingLink />
    </span>
  )
}

export function Lab() {
  return (
    <CodeOrg
      header={<Header toolbar=<Toolbar/> />}
      blockWorkspace={<BlockWorkspace blocklyOptions={{toolbox}} />}
      output={<Output />}
    />
  )
}
