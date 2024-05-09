import {CodeOrg, BlockWorkspace, Header, Output} from './layout/CodeOrg'
import {toolbox} from './toolbox'

export default function Lab() {
  return (
    <CodeOrg
      header={<Header toolbar={<span>TOOLBAR</span>} />}
      blockWorkspace={<BlockWorkspace blocklyOptions={{toolbox}} />}
      output={<Output />}
    />
  )
}
