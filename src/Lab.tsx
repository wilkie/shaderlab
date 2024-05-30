import {CodeOrg, BlockWorkspace, Header} from 'libprotolab/layout/CodeOrg'
import {blocklyOptions} from './blocks/'
import {Save, Load, Reset, Run} from 'libprotolab/blockly/workspace/buttons'

export const LAB_NAME = "Protolab"

const Toolbar = () =>
  <div style={{
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 4,
  }}>
    <Run />
    <Reset />
    <Save />
    <Load />
  </div>

const Output = () =>
  <div>Output</div>

const Instructions = () =>
  <div>Instructions</div>

export const Lab = () =>
  <CodeOrg
    header={<Header toolbar=<Toolbar/> />}
    workspace={<BlockWorkspace blocklyOptions={blocklyOptions} />}
    output={<Output/>}
    instructions={<Instructions/>}
  />