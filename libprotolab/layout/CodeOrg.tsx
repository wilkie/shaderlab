import {BlockWorkspace} from './BlockWorkspace'
import SplitPane from 'react-split-pane'

import codeOrgLogo from './code.org.svg'
import protolabLogo from '/protolab.svg'
import './resizer.css'

export {BlockWorkspace}

export function CodeOrg({
  header = <Header />,
  blockWorkspace = <BlockWorkspace />,
  output = <Output />
}) {
  return (
    <>
      {header}
      <SplitPane>
        {blockWorkspace}
        {output}
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
        Protolab
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

export function Output() {
  return (
    <div className="output" style={{
      backgroundColor: '#fff',
      height: '100%',
      padding: 16,
    }}>
      OUTPUT
    </div>
  )
}
