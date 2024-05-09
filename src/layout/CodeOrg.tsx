import codeOrgLogo from './code.org.svg'
import protolabLogo from '/protolab.svg'
import SplitPane from 'react-split-pane'
import './resizer.css'

export function CodeOrg({
  header = <Header />,
  blocks = <Blocks />,
  output = <Output />
}) {
  return (
    <>
      {header}
      <SplitPane>
        {blocks}
        {output}
      </SplitPane>
    </>
  )
}

export function Header({children=<span></span>}) {
  const HEADER_HEIGHT = 42
  const HORIZONTAL_SPACING = 16

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
        {children}
      </div>
      <div style={{
        height: HEADER_HEIGHT,
        display: 'inline-block',
        float: 'right',
        color: 'white',
        fontWeight: 'bold',
        fontSize: HEADER_HEIGHT,
      }}>
        Prototype
        <img src={protolabLogo} alt="Protolab logo" style={{
          width: HEADER_HEIGHT,
          height: HEADER_HEIGHT,
          marginRight: HORIZONTAL_SPACING,
        }}/>
      </div>
    </div>
  )
}

export function Blocks() {
  return (
    <div className="blocks" style={{
      backgroundColor: 'green',
      height: '100%',
    }}>
      Drag blocks here
    </div>
  )
}

export function Output() {
  return (
    <div className="output" style={{
      backgroundColor: 'yellow',
      height: '100%',
    }}>
      Output goes here
    </div>
  )
}
