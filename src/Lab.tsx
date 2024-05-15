import {CodeOrg, BlockWorkspace, Header, Output} from '../libprotolab/layout/CodeOrg'
import {blocklyOptions} from './blocks'

export const LAB_NAME = "Protolab"

function Toolbar() {
  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 4,
  }
  return (
    <div style={toolbarStyle}>
      <button>Run</button>
      <button>Reset</button>
    </div>
  )
}

export function Lab() {
  return (
    <CodeOrg
      header={<Header toolbar=<Toolbar/> />}
      workspace={<BlockWorkspace blocklyOptions={blocklyOptions} />}
      output={<Output />}
    />
  )
}
