import {CodeOrg, BlockWorkspace, Header, Output} from '../libprotolab/layout/CodeOrg'
import {toolbox} from './toolbox'

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
      blockWorkspace={<BlockWorkspace blocklyOptions={{toolbox}} />}
      output={<Output />}
    />
  )
}
