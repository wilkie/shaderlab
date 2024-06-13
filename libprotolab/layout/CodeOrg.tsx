import {BlocklyWorkspace} from './BlocklyWorkspace'
import SplitPane from 'react-split-pane'

import codeOrgLogo from './code.org.svg'
import protolabLogo from '/protolab.svg'
import './resizer.css'

import { getLabName } from 'libprotolab/lab-name'

export {BlocklyWorkspace as BlockWorkspace}

export function CodeOrg({
  header = <Header />,
  workspace = <BlocklyWorkspace />,
  output = <div>OUTPUT</div>,
  instructions = <div>INSTRUCTIONS</div>,
}) {
  return (
    <>
      {header}
      {/* @ts-expect-error see https://github.com/tomkp/react-split-pane/issues/826 */}
      <SplitPane split="vertical" primary="first" defaultSize={400}>
        {/* @ts-expect-error see https://github.com/tomkp/react-split-pane/issues/826 */}
        <SplitPane split="horizontal" defaultSize={400}>
          <div className="output" style={{width: '100%'}}>{output}</div>
          <div className="instructions">{instructions}</div>
        </SplitPane>
        
        {workspace}
      </SplitPane>
    </>
  )
}

export function Header({toolbar=<span></span>}) {
  const HEADER_HEIGHT = 42
  const HORIZONTAL_SPACING = 16

  function Protolab() {
    return (
      <div style={{
        height: HEADER_HEIGHT,
        display: 'inline-block',
        float: 'right',
        color: 'white',
        fontWeight: 'bold',
        fontSize: HEADER_HEIGHT,
      }}>
        {getLabName()}
        <img src={protolabLogo} alt="Protolab logo" style={{
          width: HEADER_HEIGHT,
          height: HEADER_HEIGHT,
          marginRight: HORIZONTAL_SPACING,
        }}/>
      </div>
    )
  }

  const headerStyle = {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: 'rgb(0, 147, 164)',
    paddingTop: 4,
    paddingBottom: 4,
  }

  return (
    <div className="header" style={headerStyle}>
      <img src={codeOrgLogo} alt="Code.org logo" style={{
        width: HEADER_HEIGHT,
        height: HEADER_HEIGHT,
        marginLeft: HORIZONTAL_SPACING,
      }}/>
      <div style={{
        display: 'inline-block',
        height: HEADER_HEIGHT,
        overflow: 'hidden',
        marginLeft: HORIZONTAL_SPACING,
      }}>
        {toolbar}
      </div>
      <Protolab />
    </div>
  )
}
