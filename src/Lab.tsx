import {CodeOrg, BlockWorkspace, Header, Output} from './layout/CodeOrg'
import {toolbox} from './toolbox'
import { DownloadRecordingLink } from './libprotolab/session-recorder'

function Toolbar() {
  return (
    <span>
      <DownloadRecordingLink />
    </span>
  )
}

export default function Lab() {
  return (
    <CodeOrg
      header={<Header toolbar=<Toolbar/> />}
      blockWorkspace={<BlockWorkspace blocklyOptions={{toolbox}} />}
      output={<Output />}
    />
  )
}
